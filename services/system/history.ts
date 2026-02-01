export interface HistoryEvent { id: string; type: 'kernel' | 'app' | 'fs' | 'dna'; message: string; timestamp: number; }
export class HistoryService {
  private events: HistoryEvent[] = [];
  private listeners: ((e: HistoryEvent[]) => void)[] = [];
  constructor() { this.record('kernel', 'Génesis del Sistema Shark OS Apex v15.13 iniciado.'); this.record('dna', 'Protocolo de integridad verificado por Compilador Humano.'); }
  record(type: HistoryEvent['type'], message: string) { const e = { id: crypto.randomUUID(), type, message, timestamp: Date.now() }; this.events.unshift(e); if(this.events.length > 100) this.events.pop(); this.notify(); }
  subscribe(cb: any) { this.listeners.push(cb); cb(this.events); return () => this.listeners = this.listeners.filter(l => l !== cb); }
  private notify() { this.listeners.forEach(cb => cb(this.events)); }
}