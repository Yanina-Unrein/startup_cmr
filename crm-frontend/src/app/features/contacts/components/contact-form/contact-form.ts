import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Contact } from '../../models/contact.interface';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.css']
})
export class ContactForm {

  @Output() save = new EventEmitter<Partial<Contact>>();

  errorMessage = '';

  form: Partial<Contact> = {
    name: '',
    email: '',
    whatsappPhone: ''
  };

  constructor(
    private dialogRef: MatDialogRef<ContactForm>,
    @Inject(MAT_DIALOG_DATA) public data: Contact | null
  ) {
    if (data) {
      // Edit mode
      this.form = {
        name: data.name,
        email: data.email,
        whatsappPhone: data.whatsappPhone
      };
    }
  }

  submit() {
    if (!this.form.name || !this.form.email) {
      this.errorMessage = 'Nombre y email son obligatorios';
      return;
    }
    // MVP: companyId hardcoded
    const payload: Partial<Contact> = {
      ...this.form,
      companyId: 1
    };

    this.save.emit(payload);
  }

  cancel() {
    this.dialogRef.close();
  }
}
