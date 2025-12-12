import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ContactsService } from '../../services/contact.service';
import { Contact } from '../../models/contact.interface';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactListComponent implements OnInit {
  private contactsService = inject(ContactsService);
  private dialog = inject(MatDialog);

  // accedemos a los signals/computed del service
  get contacts() { return this.contactsService.filteredContacts; } // computed -> llamar como función en template
  get isLoading() { return this.contactsService.isLoading; }      // computed
  get error() { return this.contactsService.error; }              // computed

  // filtros locales si querés exponerlos en el template
  search = '';

  ngOnInit() {
    // carga inicial; el service actualiza sus signals internamente
    this.contactsService.loadContacts().subscribe({
      next: () => {},
      error: err => console.error('Error cargando contactos', err)
    });
  }

  // abrir modal para crear
  openCreateModal() {
    const ref = this.dialog.open(ContactForm, {
      width: '520px',
      data: null
    });

    // ContactForm emite save -> lo manejamos aquí
    // componentInstance existe mientras el componente esté abierto
    const instance = ref.componentInstance as any;
    if (instance && instance.save) {
      const sub = instance.save.subscribe((payload: Partial<Contact>) => {
        // completar payload con userId / companyId si hace falta
        // por ejemplo: payload.userId = currentUser.id;
        this.contactsService.createContact(payload).subscribe({
          next: () => {
            ref.close();
            sub.unsubscribe();
          },
          error: err => {
            instance.errorMessage = err;
            sub.unsubscribe(); // dejamos que el componente maneje el error visualmente
          }
        });
      });
    }
  }

  // abrir modal para editar
  openEditModal(contact: Contact) {
    const ref = this.dialog.open(ContactForm, {
      width: '520px',
      data: contact
    });

    const instance = ref.componentInstance as any;
    if (instance && instance.save) {
      const sub = instance.save.subscribe((payload: Partial<Contact>) => {
        // el backend usa PUT /api/contactos/{id}
        this.contactsService.updateContact(contact.id!, payload).subscribe({
          next: () => {
            ref.close();
            sub.unsubscribe();
          },
          error: err => {
            instance.errorMessage = err;
            sub.unsubscribe();
          }
        });
      });
    }
  }

  // eliminar contacto
  deleteContact(contact: Contact) {
    if (!confirm(`¿Eliminar a ${contact.name}?`)) return;
    this.contactsService.deleteContact(contact.id!).subscribe({
      next: () => { /* el service actualiza el signal, no hace falta refrescar */ },
      error: err => console.error('Error eliminando', err)
    });
  }

  // setear filtro de funnelStatus en el service (si querés botones)
  setFilter(status: string) {
    this.contactsService.setFunnelFilter(status);
  }

  // búsqueda simple: actualiza el signal de búsqueda en el service
  onSearchChange(value: string) {
    this.contactsService.setSearch(value);
  }
}
