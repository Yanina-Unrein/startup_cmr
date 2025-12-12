export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  body: string;
  type: 'text' | 'html';
}
