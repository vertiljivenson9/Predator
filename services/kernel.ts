import { VFS } from './vfs'; 
import { IDBBackend, MemoryBackend } from './vfs/backends';
import { PersistentRegistry } from './registry/prefs';

export class Kernel {
  public fs = new VFS(); 
  public registry = new PersistentRegistry();
  public bootTime = Date.now();
  private pidCounter = 1;
  private processes = [];

  async boot() {
    const sys = new IDBBackend('Shark_Sys'); await sys.mount();
    const usr = new IDBBackend('Shark_Usr'); await usr.mount();
    this.fs.mount('/', sys);
    this.fs.mount('/user', usr);
    this.fs.mount('/tmp', new MemoryBackend());
    
    if (!(await this.fs.exists('/system/apps'))) await this.fs.mkdir('/system/apps');
    const apps = [
      { id: 'terminal', name: 'Terminal', icon: 'Terminal', component: 'TerminalApp', version: '15.13' },
      { id: 'git_sync', name: 'Replicator', icon: 'Zap', component: 'GitSyncApp', version: '15.13' },
      { id: 'files', name: 'Files', icon: 'Folder', component: 'FilesApp', version: '15.13' },
      { id: 'settings', name: 'Settings', icon: 'Settings', component: 'SettingsApp', version: '15.13' }
    ];
    for (const a of apps) await this.fs.write(`/system/apps/${a.id}.json`, JSON.stringify(a));
    await this.registry.set('apps.installed', apps.map(a => a.id));
  }

  spawnProcess(name: string) { 
    const pid = this.pidCounter++;
    this.processes.push({ pid, name, status: 'running', startTime: Date.now(), priority: 1 });
    return pid; 
  }
  killProcess(pid: number) { this.processes = this.processes.filter(p => p.pid !== pid); }
  getProcesses() { return this.processes; }
  launchApp(appId: string, args?: any) { window.dispatchEvent(new CustomEvent('sys-launch-app', { detail: { appId, args } })); }
}
export const kernel = new Kernel();