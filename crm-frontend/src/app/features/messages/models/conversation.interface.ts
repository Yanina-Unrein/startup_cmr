import { Message } from './message.interface';

export interface Conversation {
  contactId: number;
  lastMessage?: Message | null;
  unreadCount?: number;
}