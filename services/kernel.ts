import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
import { IDBBackend } from './vfs/backends';
export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  public bootTime = Date.now();
  async boot() {
    const sysBackend = new IDBBackend('WebOS_System', 'sys_files');
    await sysBackend.mount();
    this.fs.mount('/', sysBackend);
    const apps = [
      { id: 'settings', name: 'Ajustes', icon: 'Settings', version: '15.3' },
      { id: 'git_sync', name: 'Replicator v14', icon: 'Zap', version: '14.4' }
    ];
    for(const a of apps) await this.fs.write(`/system/apps/${a.id}.json`, JSON.stringify(a));
    await this.registry.set('apps.installed', apps.map(a => a.id));
  }
}
export const kernel = new Kernel();