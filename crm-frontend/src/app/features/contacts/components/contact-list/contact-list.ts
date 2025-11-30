import { Component, inject, EventEmitter, Output } from '@angular/core';
import { ContactsService } from '../../services/contact.service';
import { Contact } from '../../models/contact.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList {
  private contactService = inject(ContactsService);
  contacts: Contact[] = [];
  filterStatus = '';
  selectedContact: Contact | null = null;

  @Output() contactSelected = new EventEmitter<Contact>();

  ngOnInit() {
    this.contactService.contacts$.subscribe(c => this.contacts = c);
    this.contactService.loadContacts();
  }

  get filteredContacts() {
    return this.filterStatus 
      ? this.contacts.filter(c => c.funnelStatus === this.filterStatus) 
      : this.contacts;
  }

  setFilter(status: string) { this.filterStatus = status; }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.contactSelected.emit(contact);
  }
}
