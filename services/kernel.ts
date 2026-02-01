import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  public bootTime = Date.now();
  async boot() {
    const apps = [{ id: 'settings', name: 'Settings' }, { id: 'git_sync', name: 'Replicator' }];
    await this.registry.set('apps.installed', apps.map(a => a.id));
  }
  spawnProcess(name: string) { return 1; }
  killProcess(pid: number) {}
  getProcesses() { return []; }
  launchApp(appId: string, args?: any) { window.dispatchEvent(new CustomEvent('sys-launch-app', { detail: { appId, args } })); }
}
export const kernel = new Kernel();