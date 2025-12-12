export interface Contact {
  id: number;
  name: string;
  phone?: string | null;
  email?: string | null;
  whatsappPhone?: string | null;
  funnelStatus?: 'CONTACTED' | 'ACTIVE' | 'CLOSED' | 'LOST' | 'NEW' | string;
  assignedTo?: number | null;
  tags?: string[];
  dataCreacionContact?: string;
  updatedAt?: string;
  companyId?: number | null;

  // messages se mantiene opcional; puede estar cargada localmente
  messages?: MessageLite[];
}

/** Mensaje simplificado guardado dentro de Contact.messages */
export interface MessageLite {
  id: number;
  contactId: number;
  content: string;
  type: 'WHATSAPP' | 'EMAIL';
  direction: 'INCOMING' | 'OUTGOING';
  timestamp: string; // ISO string inside contact
}
