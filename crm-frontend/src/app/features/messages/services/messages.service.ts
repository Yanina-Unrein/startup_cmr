import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.interface';
import { ContactsService } from '../../contacts/services/contact.service';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private http = inject(HttpClient);
  private contactsService = inject(ContactsService);

  // store internal of Message[] converted from Contact.messages
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {
    // Inicializar a partir de contactos actuales
    const flat = this.normalizeFlat(this.contactsService.getAllMessagesFlattened());
    this.messagesSubject.next(flat);

    // Si los contactos cambian, sincronizamos (observador simple)
    this.contactsService.contacts$.subscribe(() => {
      const newFlat = this.normalizeFlat(this.contactsService.getAllMessagesFlattened());
      this.messagesSubject.next(newFlat);
    });
  }

  private normalizeFlat(flatRaw: any[]): Message[] {
    return (flatRaw ?? []).map(m => ({
      id: m.id,
      contactId: m.contactId,
      companyId: m.companyId ?? null,
      userId: m.userId ?? null,
      content: m.content ?? '',
      type: (m.type?.toString().toUpperCase() === 'WHATSAPP' ? 'WHATSAPP' : 'EMAIL'),
      direction: (m.direction?.toString().toUpperCase() === 'INCOMING' ? 'INCOMING' : 'OUTGOING'),
      timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
    }));
  }

  /** Obtener mensajes de un contacto (observable, con pequeña latencia mock) */
  getMessages(contactId: number): Observable<Message[]> {
    const msgs = this.messagesSubject.value.filter(m => m.contactId === contactId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    return of(msgs).pipe(delay(100));
  }

  /** Enviar mensaje (mock) -> actualiza ContactsService y el store local */
  sendMessage(contactId: number, content: string, opts?: { type?: 'WHATSAPP' | 'EMAIL'; userId?: number }) {
    const newMsg: Message = {
      id: Math.max(0, ...this.messagesSubject.value.map(m => m.id)) + 1,
      contactId,
      companyId: null,
      userId: opts?.userId ?? null,
      content,
      type: opts?.type ?? 'WHATSAPP',
      direction: 'OUTGOING',
      timestamp: new Date()
    };

    // Persistir en ContactsService (única fuente)
    this.contactsService.addMessage({
      id: newMsg.id,
      contactId: newMsg.contactId,
      content: newMsg.content,
      type: newMsg.type,
      direction: newMsg.direction,
      timestamp: newMsg.timestamp
    });

    // Actualizar store local
    this.messagesSubject.next([...this.messagesSubject.value, newMsg]);

    // Simular respuesta entrante en 1s (opcional)
    setTimeout(() => {
      this.simulateIncoming(contactId, `Auto-respuesta a: "${content}"`);
    }, 1000);

    return of(newMsg).pipe(delay(50));
  }

  /** Simular mensaje entrante (p. ej. webhook) */
  simulateIncoming(contactId: number, text?: string) {
    const incoming: Message = {
      id: Math.max(0, ...this.messagesSubject.value.map(m => m.id)) + 1,
      contactId,
      companyId: null,
      userId: null,
      content: text ?? `Respuesta simulada para contacto ${contactId}`,
      type: 'WHATSAPP',
      direction: 'INCOMING',
      timestamp: new Date()
    };

    this.contactsService.addMessage({
      id: incoming.id,
      contactId: incoming.contactId,
      content: incoming.content,
      type: incoming.type,
      direction: incoming.direction,
      timestamp: incoming.timestamp
    });

    this.messagesSubject.next([...this.messagesSubject.value, incoming]);
  }

  /** Obtener conversaciones resumidas (lastMessage + unreadCount mock) */
  getConversations(): Observable<{ contactId: number; lastMessage?: Message; unreadCount: number }[]> {
    const byContact = new Map<number, Message[]>();
    for (const m of this.messagesSubject.value) {
      if (!byContact.has(m.contactId)) byContact.set(m.contactId, []);
      byContact.get(m.contactId)!.push(m);
    }
    const conv = Array.from(byContact.entries()).map(([contactId, msgs]) => {
      msgs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      return { contactId, lastMessage: msgs[0], unreadCount: msgs.filter(x => x.direction === 'INCOMING').length };
    });
    return of(conv).pipe(delay(80));
  }
}
