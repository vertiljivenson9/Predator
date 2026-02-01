import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
import { IDBBackend } from './vfs/backends';
export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  public bootTime = Date.now();
  async boot() {
    const sys = new IDBBackend('WebOS_System', 'sys_files');
    await sys.mount();
    this.fs.mount('/', sys);
    const apps = [
      { id: 'settings', name: 'Settings', icon: 'Settings', version: '15.4' },
      { id: 'git_sync', name: 'Replicator v14', icon: 'Zap', version: '14.4' },
      { id: 'terminal', name: 'Terminal', icon: 'Terminal', version: '4.2' },
      { id: 'files', name: 'Files', icon: 'Folder', version: '4.1' }
    ];
    for(const a of apps) await this.fs.write(`/system/apps/${a.id}.json`, JSON.stringify(a));
    await this.registry.set('apps.installed', apps.map(x => x.id));
  }
  spawnProcess(name: string) { return 1; }
  killProcess(pid: number) {}
  getProcesses() { return []; }
}
export const kernel = new Kernel();