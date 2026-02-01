import { VFS } from './vfs'; import { PersistentRegistry } from './registry/prefs'; import { IDBBackend, MemoryBackend } from './vfs/backends'; import { Scheduler } from './kernel/scheduler';
export class Kernel {
  public fs = new VFS(); public registry = new PersistentRegistry(); public scheduler = new Scheduler(); public bootTime = Date.now();
  private pidCounter = 1;
  async boot() {
    const sys = new IDBBackend('WebOS_System', 'sys_files'); const usr = new IDBBackend('WebOS_User', 'usr_files');
    await sys.mount(); await usr.mount();
    this.fs.mount('/tmp', new MemoryBackend()); this.fs.mount('/user', usr); this.fs.mount('/', sys);
    const dirs = ['/system', '/system/apps', '/user/home', '/user/home/photos', '/user/home/dist'];
    for (const d of dirs) if (!(await this.fs.exists(d))) await this.fs.mkdir(d);
    const apps = [
      { id: 'git_sync', name: 'Replicator v15', icon: 'Zap', component: 'GitSyncApp', version: '15.13' },
      { id: 'terminal', name: 'Terminal', icon: 'Terminal', component: 'TerminalApp', version: '4.2' },
      { id: 'files', name: 'File Explorer', icon: 'Folder', component: 'FilesApp', version: '4.1' },
      { id: 'settings', name: 'Settings', icon: 'Settings', component: 'SettingsApp', version: '4.5' }
    ];
    for (const a of apps) await this.fs.write(`/system/apps/${a.id}.json`, JSON.stringify(a));
    await this.registry.set('apps.installed', apps.map(a => a.id));
    this.scheduler.start();
  }
  spawnProcess(name: string) { const pid = this.pidCounter++; this.scheduler.add({ pid, name, status: 'running', startTime: Date.now(), priority: 1 }); return pid; }
  killProcess(pid: number) { this.scheduler.remove(pid); }
  getProcesses() { return this.scheduler.getAll(); }
  launchApp(appId: string, args?: any) { window.dispatchEvent(new CustomEvent('sys-launch-app', { detail: { appId, args } })); }
}
export const kernel = new Kernel();