import { VFS } from './vfs'; import { IDBBackend } from './vfs/backends';
export class Kernel {
  public fs = new VFS(); public bootTime = Date.now();
  async boot() {
    const sys = new IDBBackend('Predator_Sys'); await sys.mount();
    this.fs.mount('/', sys);
    if (!(await this.fs.exists('/system/apps'))) await this.fs.mkdir('/system/apps');
    const apps = [{ id: 'terminal', name: 'Terminal', icon: 'Terminal', component: 'TerminalApp', version: '15.13' }];
    for (const a of apps) await this.fs.write(`/system/apps/${a.id}.json`, JSON.stringify(a));
  }
  spawnProcess(name: string) { return Math.floor(Math.random() * 10000); }
  killProcess(pid: number) {}
  launchApp(appId: string, args?: any) { window.dispatchEvent(new CustomEvent('sys-launch-app', { detail: { appId, args } })); }
}
export const kernel = new Kernel();