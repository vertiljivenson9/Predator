import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  public bootTime = Date.now();
  private pidCounter = 1;
  async boot() {
    const apps = [{ id: 'settings', name: 'Ajustes', icon: 'Settings', version: '15.1' }, { id: 'terminal', name: 'Terminal', icon: 'Terminal', version: '4.2' }];
    await this.registry.set('apps.installed', apps.map(a => a.id));
  }
  spawnProcess(name: string) { return this.pidCounter++; }
  killProcess(pid: number) {}
}
export const kernel = new Kernel();