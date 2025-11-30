import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessagesService } from '../../../services/messages.service';
import { Contact } from '@/app/features/contacts/models/contact.interface';
import { Message } from '../../../models/message.interface';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  @Input() contact: Contact | null = null;

  newMessage = '';
  messages: Message[] = [];
  private messagesService = inject(MessagesService);

  ngOnChanges() {
    if (this.contact?.id != null) {
      this.loadMessages(this.contact.id);
    } else {
      this.messages = [];
    }
  }

  loadMessages(contactId: number) {
    this.messagesService.getMessages(contactId).subscribe(msgs => {
      this.messages = msgs;
      setTimeout(() => this.scrollToBottom(), 50);
    });
  }

  send() {
    if (!this.contact || !this.newMessage.trim()) return;
    const payload = this.newMessage.trim();
    this.messagesService.sendMessage(this.contact.id, payload).subscribe(() => {
      this.loadMessages(this.contact!.id);
      this.newMessage = '';
    });
  }

  simulateIncoming() {
    if (!this.contact) return;
    this.messagesService.simulateIncoming(this.contact.id, `Simulado: saludo a ${this.contact.name}`);
    this.loadMessages(this.contact.id);
  }

  private scrollToBottom() {
    const el = document.querySelector('.chat-messages');
    if (el) el.scrollTop = el.scrollHeight;
  }
}
