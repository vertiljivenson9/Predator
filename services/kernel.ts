import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
import { IDBBackend, MemoryBackend } from './vfs/backends';
import { Scheduler } from './kernel/scheduler';
import { AudioMixer } from './media/audio';
import { HistoryService } from './system/history';
import { PackageManager } from './pkg/manager';

export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  public scheduler = new Scheduler();
  public audio = new AudioMixer();
  public history = new HistoryService();
  public pkg = new PackageManager();
  public bootTime = Date.now();
  private pidCounter = 1;

  async boot() {
    const sysBackend = new IDBBackend('Shark_System', 'sys');
    await sysBackend.mount();
    this.fs.mount('/', sysBackend);
    this.fs.mount('/tmp', new MemoryBackend());
    
    const apps = [
      { id: 'git_sync', name: 'Replicator v14', icon: 'Zap', version: '14.2' },
      { id: 'settings', name: 'Settings', icon: 'Settings', version: '4.5' },
      { id: 'terminal', name: 'Terminal', icon: 'Terminal', version: '4.2' },
      { id: 'files', name: 'Files', icon: 'Folder', version: '4.1' },
      { id: 'ide', name: 'Viscro Studio', icon: 'Code', version: '1.2' },
      { id: 'gallery', name: 'Gallery', icon: 'Image', version: '2.0' },
      { id: 'camera', name: 'Camera', icon: 'Camera', version: '2.0' }
      // ... Resto de apps por defecto
    ];

    if (!(await this.fs.exists('/system/apps'))) await this.fs.mkdir('/system/apps');
    for (const app of apps) {
      await this.fs.write(`/system/apps/${app.id}.json`, JSON.stringify(app));
    }
    await this.registry.set('apps.installed', apps.map(a => a.id));
    this.scheduler.start();
    this.history.record('kernel', 'Master DNA Boot v14.2 Success.');
  }

  spawnProcess(name: string) {
    const pid = this.pidCounter++;
    this.scheduler.add({ pid, name, status: 'running', startTime: Date.now(), priority: 1 });
    return pid;
  }
  killProcess(pid: number) { this.scheduler.remove(pid); }
  getProcesses() { return this.scheduler.getAll(); }
}
export const kernel = new Kernel();