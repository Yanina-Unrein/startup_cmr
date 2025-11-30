import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from '@/app/features/messages/components/chat-list/chat-list.component/chat-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatListComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  private router = inject(Router);

  onOpenConversation(contactId: number) {
    this.router.navigate(['/dashboard/messages', contactId]);
  }

}

