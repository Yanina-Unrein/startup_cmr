import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from '@/app/features/messages/components/chat-window/chat-window.component/chat-window.component';
import { ContactsService } from '@/app/features/contacts/services/contact.service';
import { Contact } from '@/app/features/contacts/models/contact.interface';

@Component({
  selector: 'app-messages-page',
  standalone: true,
  imports: [CommonModule, ChatWindowComponent],
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent {
  private route = inject(ActivatedRoute);
  private contactsService = inject(ContactsService);

   contact: Contact | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('contactId'));
      this.contact = this.contactsService.getContactById(id) || null;
    });
  }
}

