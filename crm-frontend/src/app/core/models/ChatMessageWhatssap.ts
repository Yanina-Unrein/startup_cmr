export interface ChatMessage {
  id: string;
  contactId: string;
  contactName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'audio' | 'document';
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  isFromMe: boolean;
  mediaUrl?: string;
}