import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
import { IDBBackend, MemoryBackend } from './vfs/backends';
import { Scheduler } from './kernel/scheduler';
import { AudioMixer } from './media/audio';
import { HistoryService } from './system/history';
import { PackageManager } from './pkg/manager';
import { PowerManager } from './system/power';
import { NetworkStack } from './net/stack';
import { Compositor } from './wm/compositor';
import { ClipboardManager } from './system/clipboard';
import { NotificationManager } from './system/notifications';
import { VoiceControl } from './input/voice';

export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  public scheduler = new Scheduler();
  public audio = new AudioMixer();
  public history = new HistoryService();
  public pkg = new PackageManager();
  public power = new PowerManager();
  public net = new NetworkStack();
  public compositor = new Compositor();
  public clipboard = new ClipboardManager();
  public notifications = new NotificationManager();
  public voice = new VoiceControl();
  public bootTime = Date.now();
  private pidCounter = 1;

  async boot() {
    await this.power.init();
    const sysBackend = new IDBBackend('Shark_System', 'sys');
    await sysBackend.mount();
    this.fs.mount('/', sysBackend);
    this.fs.mount('/tmp', new MemoryBackend());
    
    const apps = [
      { id: 'git_sync', name: 'Replicator v14.3', icon: 'Zap', version: '14.3' },
      { id: 'settings', name: 'Settings', icon: 'Settings', version: '4.5' },
      { id: 'terminal', name: 'Terminal', icon: 'Terminal', version: '4.2' },
      { id: 'files', name: 'Files', icon: 'Folder', version: '4.1' },
      { id: 'ide', name: 'Viscro Studio', icon: 'Code', version: '1.2' },
      { id: 'gallery', name: 'Gallery', icon: 'Image', version: '2.0' },
      { id: 'camera', name: 'Camera', icon: 'Camera', version: '2.0' },
      { id: 'calculator', name: 'Calculator', icon: 'Calculator', version: '1.5' },
      { id: 'music', name: 'Music', icon: 'Music', version: '1.0' },
      { id: 'video', name: 'Video', icon: 'Film', version: '1.0' },
      { id: 'weather', name: 'Weather', icon: 'Cloud', version: '1.0' },
      { id: 'paint', name: 'Paint', icon: 'Palette', version: '1.0' },
      { id: 'news', name: 'News', icon: 'Zap', version: '1.0' },
      { id: 'timeline', name: 'Timeline', icon: 'History', version: '1.0' },
      { id: 'sys_mon', name: 'Sys Monitor', icon: 'Activity', version: '1.0' },
      { id: 'zip_export', name: 'Export', icon: 'Archive', version: '1.0' },
      { id: 'clock', name: 'Clock', icon: 'Clock', version: '1.0' },
      { id: 'editor', name: 'Editor', icon: 'Code', version: '1.0' }
    ];

    if (!(await this.fs.exists('/system/apps'))) await this.fs.mkdir('/system/apps');
    for (const app of apps) {
      await this.fs.write(`/system/apps/${app.id}.json`, JSON.stringify(app));
    }
    await this.registry.set('apps.installed', apps.map(a => a.id));
    this.scheduler.start();
    this.history.record('kernel', 'Kernel v14.3: Master DNA Verified.');
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