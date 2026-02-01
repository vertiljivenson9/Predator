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
      const dirs = ['/system', '/system/apps', '/user/home', '/user/home/photos', '/user/home/dist'];
      for (const d of dirs) if (!(await this.fs.exists(d))) await this.fs.mkdir(d);
      const apps: AppDefinition[] = [
        { id: 'git_sync', name: 'Flux Replicator', icon: 'Zap', component: 'GitSyncApp', version: '12.5', defaultWidth: 1000, defaultHeight: 700 },
        { id: 'terminal', name: 'Terminal', icon: 'Terminal', component: 'TerminalApp', version: '4.0', defaultWidth: 700, defaultHeight: 450 },
        { id: 'files', name: 'Files', icon: 'Folder', component: 'FilesApp', version: '4.0', defaultWidth: 850, defaultHeight: 550 },
        { id: 'settings', name: 'Settings', icon: 'Settings', component: 'SettingsApp', version: '4.0', defaultWidth: 900, defaultHeight: 600 },
        { id: 'ide', name: 'Studio', icon: 'Code', component: 'IDEApp', version: '1.0', defaultWidth: 1100, defaultHeight: 750 }
      ];
      for (const app of apps) await this.fs.write(`/system/apps/${app.id}.json`, JSON.stringify(app));
      await this.registry.set('apps.installed', apps.map(a => a.id));
      this.scheduler.start();
      this._booted = true;
    } catch(e) { throw e; }
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