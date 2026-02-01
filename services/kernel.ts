import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
import { IDBBackend, MemoryBackend } from './vfs/backends';
import { Scheduler } from './kernel/scheduler';
import { PowerManager } from './system/power';
import { NetworkStack } from './net/stack';
import { PackageManager } from './pkg/manager';
import { Compositor } from './wm/compositor';
import { AudioMixer } from './media/audio';
import { ClipboardManager } from './system/clipboard';
import { NotificationManager } from './system/notifications';
import { VoiceControl } from './input/voice';
import { HistoryService } from './system/history';
import { IVFS, IRegistry, Process, AppDefinition } from '../types';

export class Kernel {
  public fs: IVFS = new VFS();
  public registry: IRegistry = new PersistentRegistry();
  public scheduler: Scheduler = new Scheduler();
  public power: PowerManager = new PowerManager();
  public net: NetworkStack = new NetworkStack();
  public pkg: PackageManager = new PackageManager();
  public compositor: Compositor = new Compositor();
  public audio: AudioMixer = new AudioMixer(); 
  public clipboard: ClipboardManager = new ClipboardManager();
  public notifications: NotificationManager = new NotificationManager();
  public voice: VoiceControl = new VoiceControl();
  public history: HistoryService = new HistoryService();
  
  public bootTime: number = 0;
  private pidCounter = 1;
  private _booted = false;

  async boot(): Promise<void> {
    if (this._booted) return;
    this.bootTime = Date.now();
    try {
      await this.power.init();
      const sysBackend = new IDBBackend('WebOS_System', 'sys_files');
      const usrBackend = new IDBBackend('WebOS_User', 'usr_files');
      await sysBackend.mount();
      await usrBackend.mount();
      this.fs.mount('/tmp', new MemoryBackend());
      this.fs.mount('/user', usrBackend);
      this.fs.mount('/', sysBackend); 
      const dirs = ['/system', '/system/apps', '/user/home', '/user/home/photos', '/user/home/dist', '/user/secure'];
      for (const d of dirs) if (!(await this.fs.exists(d))) await this.fs.mkdir(d);

      const apps: AppDefinition[] = [
        { id: 'git_sync', name: 'Replicator v13', icon: 'Zap', component: 'GitSyncApp', version: '13.5', defaultWidth: 1000, defaultHeight: 700 },
        { id: 'terminal', name: 'Terminal', icon: 'Terminal', component: 'TerminalApp', version: '4.2', defaultWidth: 750, defaultHeight: 480 },
        { id: 'files', name: 'File Explorer', icon: 'Folder', component: 'FilesApp', version: '4.1', defaultWidth: 900, defaultHeight: 600 },
        { id: 'settings', name: 'Settings', icon: 'Settings', component: 'SettingsApp', version: '4.5', defaultWidth: 950, defaultHeight: 650 },
        { id: 'ide', name: 'Viscro Studio', icon: 'Code', component: 'IDEApp', version: '1.2', defaultWidth: 1150, defaultHeight: 800 },
        { id: 'store', name: 'App Store', icon: 'ShoppingCart', component: 'StoreApp', version: '1.0', defaultWidth: 850, defaultHeight: 650 },
        { id: 'search', name: 'Jedge Browser', icon: 'Globe', component: 'SearchApp', version: '99.0', defaultWidth: 1000, defaultHeight: 700 },
        { id: 'camera', name: 'Camera', icon: 'Camera', component: 'CameraApp', version: '2.0', defaultWidth: 600, defaultHeight: 700 },
        { id: 'gallery', name: 'Gallery', icon: 'Image', component: 'GalleryApp', version: '2.0', defaultWidth: 900, defaultHeight: 650 },
        { id: 'calculator', name: 'Calculator', icon: 'Calculator', component: 'CalculatorApp', version: '1.5', defaultWidth: 350, defaultHeight: 550 },
        { id: 'music', name: 'Music', icon: 'Music', component: 'MusicApp', version: '1.0', defaultWidth: 400, defaultHeight: 600 },
        { id: 'video', name: 'Video Player', icon: 'Film', component: 'VideoPlayerApp', version: '1.0', defaultWidth: 800, defaultHeight: 500 },
        { id: 'weather', name: 'Weather', icon: 'Cloud', component: 'WeatherApp', version: '1.0', defaultWidth: 400, defaultHeight: 650 },
        { id: 'paint', name: 'Apex Paint', icon: 'Palette', component: 'PaintApp', version: '1.0', defaultWidth: 900, defaultHeight: 650 },
        { id: 'news', name: 'Hacker News', icon: 'Zap', component: 'NewsApp', version: '1.0', defaultWidth: 500, defaultHeight: 700 },
        { id: 'timeline', name: 'Timeline', icon: 'History', component: 'TimelineApp', version: '1.0', defaultWidth: 700, defaultHeight: 600 },
        { id: 'sys_mon', name: 'Sys Monitor', icon: 'Activity', component: 'SystemMonitorApp', version: '1.0', defaultWidth: 800, defaultHeight: 550 },
        { id: 'zip_export', name: 'Archive Tool', icon: 'Archive', component: 'ZipExportApp', version: '1.0', defaultWidth: 850, defaultHeight: 550 },
        { id: 'clock', name: 'Clock', icon: 'Clock', component: 'ClockApp', version: '1.0', defaultWidth: 400, defaultHeight: 600 }
      ];

      for (const app of apps) await this.fs.write(`/system/apps/${app.id}.json`, JSON.stringify(app));
      await this.registry.set('apps.installed', apps.map(a => a.id));
      this.scheduler.start();
      this._booted = true;
      this.history.record('kernel', 'Master Sync Unified v13.5: Kernel Boot Success.');
    } catch (e) { throw e; }
  }

  spawnProcess(name: string): number {
    const pid = this.pidCounter++;
    this.scheduler.add({ pid, name, status: 'running', startTime: Date.now(), priority: 1 });
    return pid;
  }
  killProcess(pid: number): void { this.scheduler.remove(pid); }
  getProcesses(): Process[] { return this.scheduler.getAll(); }
  launchApp(appId: string, args?: any) {
    window.dispatchEvent(new CustomEvent('sys-launch-app', { detail: { appId, args } }));
  }
}
export const kernel = new Kernel();