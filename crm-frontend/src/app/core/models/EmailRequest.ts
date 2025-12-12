export interface EmailRequest {
  to: string;
  toId: number;
  subject: string;
  body: string;
  senderId: number;
}