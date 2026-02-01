export class HistoryService {
  record(t: string, m: string) { console.log('HIST: ' + t + ' ' + m); }
  subscribe(cb: any) { return () => {}; }
}