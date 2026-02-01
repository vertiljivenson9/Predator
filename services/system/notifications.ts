import { Notification } from '../../types';
export class NotificationManager {
  private history: Notification[] = [];
  push(title: string, message: string, urgent = false) {
    const n = { id: crypto.randomUUID(), title, message, timestamp: Date.now(), urgent };
    this.history.unshift(n); if(this.history.length > 50) this.history.pop();
    console.log('[Notify]', title, message);
  }
  getHistory() { return this.history; }
}