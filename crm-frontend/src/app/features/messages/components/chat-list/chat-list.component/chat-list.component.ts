import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../../services/messages.service';
import { ContactsService } from '@/app/features/contacts/services/contact.service';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatBadgeModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  private messagesService = inject(MessagesService);
  private contactsService = inject(ContactsService);

  conversations: { contactId: number; lastMessage?: any; unreadCount: number }[] = [];

  @Output() openConversation = new EventEmitter<number>();

  ngOnInit() {
    this.messagesService.messages$.subscribe(() => {
      this.refresh();
    });
  }

  private refresh() {
    this.messagesService.getConversations()
      .subscribe(conv => this.conversations = conv);
  }

  open(contactId: number) {
    this.openConversation.emit(contactId);
  }

  contactName(contactId: number) {
    const c = this.contactsService.getContactById(contactId);
    return c ? c.name : `#${contactId}`;
  }
}
