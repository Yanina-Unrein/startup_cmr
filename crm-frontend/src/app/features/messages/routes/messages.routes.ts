import { Routes } from '@angular/router';
import { ChatListComponent } from '../components/chat-list/chat-list.component/chat-list.component';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component/chat-window.component';

export const MessagesRoutes: Routes = [
  {
    path: '',
    component: ChatListComponent,
    children: [
      {
        path: ':contactId',
        component: ChatWindowComponent
      }
    ]
  }
];
