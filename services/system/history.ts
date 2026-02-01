export class HistoryService {
  private h: any[] = [];
  record(t: string, m: string) { this.h.unshift({ id: Math.random(), t, m, time: Date.now() }); }
  subscribe(cb: any) { cb(this.h); return () => {}; }
}