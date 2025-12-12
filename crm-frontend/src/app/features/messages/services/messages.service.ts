import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.interface';
import { ContactsService } from '../../contacts/services/contact.service';
import { WebsocketService } from '@/app/services/websocket.service';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private http = inject(HttpClient);
  private websocket = inject(WebsocketService);
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.websocket.connect();
  }

  /** Cargar historial desde API real */
  getMessages(contactId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`/api/messages/${contactId}`).pipe(
      tap(msgs => {
        const merged = [...this.messagesSubject.value, ...msgs];
        this.messagesSubject.next(merged);
      })
    );
  }

  /** Escuchar mensajes entrantes */
  listenToContact(contactId: number) {
    const topic = `/user/topic/contact/${contactId}`;

    this.websocket.subscribeTopic(topic).subscribe((m: any) => {
      const msg: Message = {
        id: m.id,
        contactId: m.contactId,
        content: m.content,
        type: m.type,
        direction: m.direction,
        timestamp: new Date(m.timestamp)
      };

      this.messagesSubject.next([...this.messagesSubject.value, msg]);
    });
  }

  /** Enviar mensaje */
  sendMessage(contactId: number, content: string) {
    const payload = { contactId, content, type: 'WHATSAPP' };

    this.websocket.sendMessage('/app/send', payload);

    const temp: Message = {
      id: Date.now(),
      contactId,
      content,
      type: 'WHATSAPP',
      direction: 'OUTGOING',
      timestamp: new Date(),
      status: 'sending'
    };

    this.messagesSubject.next([...this.messagesSubject.value, temp]);

    return of(temp);
  }

  /** Conversaciones resumidas */
  getConversations() {
    const all = this.messagesSubject.value;
    const map = new Map<number, Message[]>();

    for (const m of all) {
      if (!map.has(m.contactId)) map.set(m.contactId, []);
      map.get(m.contactId)!.push(m);
    }

    const conv = Array.from(map.entries()).map(([contactId, msgs]) => {
      msgs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      return {
        contactId,
        lastMessage: msgs[0],
        unreadCount: msgs.filter(x => x.direction === 'INCOMING').length
      };
    });

    return of(conv);
  }
}