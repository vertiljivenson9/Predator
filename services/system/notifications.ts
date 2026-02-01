export class NotificationManager {
  private h: any[] = [];
  push(t: string, m: string) { this.h.unshift({ id: Math.random(), t, m, time: Date.now() }); console.log('Notify:', t); }
  getHistory() { return this.h; }
}