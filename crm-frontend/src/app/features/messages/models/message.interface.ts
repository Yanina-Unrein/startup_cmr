export type TypeMessage = 'WHATSAPP' | 'EMAIL';
export type DirectionMessage = 'INCOMING' | 'OUTGOING';

export interface Message {
  id: number;
  contactId: number;
  companyId?: number | null;
  userId?: number | null;
  content: string;
  type: TypeMessage;
  direction: DirectionMessage;
  timestamp: Date;
}
