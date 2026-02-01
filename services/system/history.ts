export class HistoryService {
  private events: any[] = [];
  private listeners: any[] = [];
  record(type: string, message: string) { const e = { id: crypto.randomUUID(), type, message, timestamp: Date.now() }; this.events.unshift(e); this.notify(); }
  subscribe(cb: any) { this.listeners.push(cb); cb(this.events); return () => this.listeners = this.listeners.filter(l => l !== cb); }
  private notify() { this.listeners.forEach(cb => cb(this.events)); }
}