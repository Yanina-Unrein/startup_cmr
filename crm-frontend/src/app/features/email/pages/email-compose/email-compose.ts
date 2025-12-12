import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContactsService } from '@/app/features/contacts/services/contact.service';
import { Contact } from '@/app/features/contacts/models/contact.interface';
import { EmailTemplate } from '@/app/core/models/EmailTemplate';
import { EmailRequest } from '@/app/core/models/EmailRequest';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-email-compose',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './email-compose.html',
  styleUrl: './email-compose.css',
})
export class EmailCompose implements OnInit {
  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);
  private contactsService = inject(ContactsService);
  private snackBar = inject(MatSnackBar);

  emailForm!: FormGroup;
  contacts: Contact[] = [];
  templates: EmailTemplate[] = [];
  
  emailType: 'text' | 'html' = 'text';
  isSending = false;
  selectedContacts: Contact[] = [];
  
  // Para el editor HTML
  htmlPreview = '';
  showPreview = false;

  // Variables de plantillas predefinidas
  htmlTemplates = [
    {
      name: 'Bienvenida',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333; margin-bottom: 20px;">¡Bienvenido/a!</h1>
            <p style="color: #666; line-height: 1.6;">Nos alegra tenerte con nosotros.</p>
            <a href="#" style="display: inline-block; margin-top: 20px; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Comenzar</a>
          </div>
        </div>
      `
    },
    {
      name: 'Seguimiento',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Seguimiento de tu consulta</h2>
          <p style="color: #666; line-height: 1.6;">Gracias por tu interés. Queremos hacer seguimiento de tu consulta.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff;">
            <p style="margin: 0; color: #666;">Estamos aquí para ayudarte en lo que necesites.</p>
          </div>
        </div>
      `
    },
    {
      name: 'Propuesta Comercial',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Propuesta Comercial</h2>
          <p style="color: #666; line-height: 1.6;">Adjuntamos nuestra propuesta personalizada para ti.</p>
          <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Servicio</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">Precio</th>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #dee2e6;">Servicio 1</td>
              <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">$1000</td>
            </tr>
          </table>
        </div>
      `
    }
  ];

  ngOnInit() {
    this.initForm();
    this.loadContacts();
    this.loadTemplates();
  }

  private initForm() {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      toId: [null, Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      senderId: [1] // Obtener del auth service
    });
  }

  private loadContacts(): void {
    // Cargar contactos usando tu servicio con signals
    this.contactsService.loadContacts().subscribe({
      next: (contacts: Contact[]) => {
        // Los contactos ya están en el signal del servicio
        // Acceder directamente al signal
        this.contacts = this.contactsService.contacts();
      },
      error: (error: Error) => {
        console.error('Error loading contacts:', error);
        // Como fallback, usar el signal aunque esté vacío
        this.contacts = this.contactsService.contacts();
      }
    });
  }

  private loadTemplates(): void {
    this.emailService.getTemplates().subscribe({
      next: (templates: EmailTemplate[]) => {
        this.templates = templates;
      },
      error: (error: Error) => {
        console.error('Error loading templates:', error);
        // Usar plantillas vacías como fallback
        this.templates = [];
      }
    });
  }

  onContactSelected(contact: Contact) {
    if (contact) {
      this.emailForm.patchValue({
        to: contact.email,
        toId: contact.id
      });
    }
  }

  onTemplateSelected(template: EmailTemplate) {
    this.emailForm.patchValue({
      subject: template.subject,
      body: template.body
    });
    this.emailType = template.type;
  }

  onHtmlTemplateSelected(template: any) {
    this.emailForm.patchValue({
      body: template.html
    });
    this.emailType = 'html';
    this.updatePreview();
  }

  toggleEmailType() {
    this.emailType = this.emailType === 'text' ? 'html' : 'text';
    if (this.emailType === 'html') {
      this.updatePreview();
    }
  }

  updatePreview() {
    const body = this.emailForm.get('body')?.value;
    this.htmlPreview = body || '';
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
    if (this.showPreview) {
      this.updatePreview();
    }
  }

  insertHtmlTag(tag: string) {
    const bodyControl = this.emailForm.get('body');
    const currentValue = bodyControl?.value || '';
    let newValue = '';

    switch (tag) {
      case 'bold':
        newValue = currentValue + '<strong>texto en negrita</strong>';
        break;
      case 'italic':
        newValue = currentValue + '<em>texto en cursiva</em>';
        break;
      case 'link':
        newValue = currentValue + '<a href="https://ejemplo.com">texto del enlace</a>';
        break;
      case 'image':
        newValue = currentValue + '<img src="URL_DE_IMAGEN" alt="descripción" style="max-width: 100%;">';
        break;
      case 'heading':
        newValue = currentValue + '<h2>Título</h2>';
        break;
      case 'paragraph':
        newValue = currentValue + '<p>Párrafo de texto</p>';
        break;
      case 'button':
        newValue = currentValue + '<a href="#" style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Botón</a>';
        break;
      case 'divider':
        newValue = currentValue + '<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">';
        break;
    }

    bodyControl?.setValue(newValue);
    this.updatePreview();
  }

  sendEmail(): void {
    if (this.emailForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.isSending = true;
    const emailData: EmailRequest = this.emailForm.value;

    const sendObservable = this.emailType === 'html' 
      ? this.emailService.sendHtmlEmail(emailData)
      : this.emailService.sendTextEmail(emailData);

    sendObservable.subscribe({
      next: (response: string) => {
        this.snackBar.open('✅ Email enviado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.resetForm();
      },
      error: (error: Error) => {
        console.error('Error sending email:', error);
        this.snackBar.open('❌ Error al enviar el email. Intenta nuevamente.', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      },
      complete: () => {
        this.isSending = false;
      }
    });
  }

  resetForm() {
    this.emailForm.reset({
      senderId: 1
    });
    this.showPreview = false;
    this.htmlPreview = '';
  }

  saveAsTemplate(): void {
    const template: EmailTemplate = {
      id: 0,
      name: this.emailForm.get('subject')?.value || 'Nueva plantilla',
      subject: this.emailForm.get('subject')?.value,
      body: this.emailForm.get('body')?.value,
      type: this.emailType
    };

    this.emailService.saveTemplate(template).subscribe({
      next: (savedTemplate: EmailTemplate) => {
        this.snackBar.open('Plantilla guardada correctamente', 'Cerrar', {
          duration: 3000
        });
        this.loadTemplates();
      },
      error: (error: Error) => {
        console.error('Error saving template:', error);
        this.snackBar.open('Error al guardar la plantilla', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
}