export interface WebSocketMessage {
  type: 'MESSAGE' | 'STATUS' | 'TYPING' | 'READ' | 'DELIVERED';
  payload: any;
  timestamp: number;
}