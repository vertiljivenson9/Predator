export class Scheduler {
  private procs: any[] = [];
  add(p: any) { this.procs.push(p); }
  remove(pid: number) { this.procs = this.procs.filter(p => p.pid !== pid); }
  getAll() { return this.procs; }
  start() { console.log('Scheduler Active'); }
  stop() {}
}