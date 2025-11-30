import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Contact, MessageLite } from '../models/contact.interface';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private http = inject(HttpClient);

  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  constructor() {
    // seed mock local (puede venir del backend)
    const seed: Contact[] = [
      { id: 1, name: 'Juan Perez', funnelStatus: 'NEW', email: 'juan@example.com', messages: [] },
      { id: 2, name: 'María Gómez', funnelStatus: 'ACTIVE', phone: '3511234567', messages: [] }
    ];
    this.contactsSubject.next(seed);
  }

  loadContacts(): Observable<Contact[]> {
    // Replace by: return this.http.get<Contact[]>('/api/contacts')
  const current = this.contactsSubject.value;
  this.contactsSubject.next(current); 
  return of(current);
}

  /** Obtener un contacto por id (sin cambiar el stream) */
  getContactById(id: number): Contact | undefined {
    return this.contactsSubject.value.find(c => c.id === id);
  }

  /** Añadir nuevo contacto (actualiza stream) */
  addContact(contact: Partial<Contact>) {
    const nextId = Math.max(0, ...this.contactsSubject.value.map(c => c.id)) + 1;
    const newContact: Contact = {
      id: nextId,
      name: contact.name ?? 'Sin nombre',
      email: contact.email ?? null,
      phone: contact.phone ?? null,
      whatsappPhone: contact.whatsappPhone ?? null,
      funnelStatus: contact.funnelStatus ?? 'NEW',
      assignedTo: contact.assignedTo ?? null,
      tags: contact.tags ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      companyId: contact.companyId ?? null,
      messages: []
    };
    this.contactsSubject.next([...this.contactsSubject.value, newContact]);
    return newContact;
  }

  /**
   * Añadir mensaje a un contacto: mantiene single source of truth
   * message.timestamp puede ser Date o string ISO
   */
  addMessage(message: {
    id?: number;
    contactId: number;
    content: string;
    type: 'WHATSAPP' | 'EMAIL' | string;
    direction: 'INCOMING' | 'OUTGOING' | string;
    timestamp?: string | Date;
  }) {
    const contacts = this.contactsSubject.value.map(c => {
      if (c.id === message.contactId) {
        const nextMsgId =
          Math.max(0, ...(c.messages?.map(m => m.id) ?? [0])) + 1;
        const msg: MessageLite = {
          id: message.id ?? nextMsgId,
          contactId: message.contactId,
          content: message.content,
          type: (message.type?.toString().toUpperCase() === 'WHATSAPP' ? 'WHATSAPP' : 'EMAIL'),
          direction: (message.direction?.toString().toUpperCase() === 'INCOMING' ? 'INCOMING' : 'OUTGOING'),
          timestamp: (message.timestamp instanceof Date) ? message.timestamp.toISOString() : (message.timestamp ?? new Date().toISOString())
        };
        c.messages = c.messages ? [...c.messages, msg] : [msg];
      }
      return c;
    });
    this.contactsSubject.next(contacts);
  }

  /**
   * Retorna todos los mensajes en una lista plana (MessageLite[] con timestamp ISO)
   */
  getAllMessagesFlattened(): MessageLite[] {
    const flat: MessageLite[] = [];
    for (const c of this.contactsSubject.value) {
      if (c.messages && c.messages.length) {
        for (const m of c.messages) flat.push(m);
      }
    }
    return flat;
  }
}
