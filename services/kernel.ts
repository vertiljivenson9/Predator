import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
import { IDBBackend, MemoryBackend } from './vfs/backends';
import { Scheduler } from './kernel/scheduler';
import { HistoryService } from './system/history';
import { NotificationManager } from './system/notifications';
import { AudioMixer } from './media/audio';
import { VoiceControl } from './input/voice';
import { PackageManager } from './pkg/manager';

export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  public scheduler = new Scheduler();
  public history = new HistoryService();
  public notifications = new NotificationManager();
  public audio = new AudioMixer();
  public voice = new VoiceControl();
  public pkg = new PackageManager();
  public bootTime = Date.now();
  private pidCounter = 1;

  async boot() {
    const sysBackend = new IDBBackend('WebOS_System', 'sys_files');
    await sysBackend.mount();
    this.fs.mount('/', sysBackend);
    this.fs.mount('/tmp', new MemoryBackend());
    
    const apps = [
      { id: 'settings', name: 'Ajustes', icon: 'Settings', version: '15.2' },
      { id: 'terminal', name: 'Terminal', icon: 'Terminal', version: '4.2' },
      { id: 'files', name: 'Explorador', icon: 'Folder', version: '4.1' },
      { id: 'ide', name: 'Viscro Studio', icon: 'Code', version: '1.2' },
      { id: 'git_sync', name: 'Replicator v14', icon: 'Zap', version: '14.4' },
      { id: 'gallery', name: 'Galería', icon: 'Image', version: '2.0' },
      { id: 'calculator', name: 'Cálculo', icon: 'Calculator', version: '1.5' },
      { id: 'video', name: 'Vídeo', icon: 'Film', version: '1.0' },
      { id: 'paint', name: 'Dibujo', icon: 'Palette', version: '1.0' },
      { id: 'search', name: 'Jedge Browser', icon: 'Globe', version: '99.0' },
      { id: 'news', name: 'Hacker News', icon: 'Zap', version: '1.0' },
      { id: 'timeline', name: 'Timeline', icon: 'History', version: '1.0' },
      { id: 'sys_mon', name: 'Sys Monitor', icon: 'Activity', version: '1.0' }
    ];

    for (const app of apps) {
      await this.fs.write(`/system/apps/${app.id}.json`, JSON.stringify(app));
    }
    await this.registry.set('apps.installed', apps.map(a => a.id));
    this.scheduler.start();
    this.history.record('kernel', 'Shark Kernel v15.2 Online');
  }

  spawnProcess(name: string) {
    const pid = this.pidCounter++;
    this.scheduler.add({ pid, name, status: 'running', startTime: Date.now(), priority: 1 });
    return pid;
  }
  killProcess(pid: number) { this.scheduler.remove(pid); }
  launchApp(appId: string, args?: any) {
    window.dispatchEvent(new CustomEvent('sys-launch-app', { detail: { appId, args } }));
  }
}
export const kernel = new Kernel();