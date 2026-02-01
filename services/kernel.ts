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
      await sysBackend.mount(); await usrBackend.mount();
      this.fs.mount('/tmp', new MemoryBackend());
      this.fs.mount('/user', usrBackend);
      this.fs.mount('/', sysBackend); 
      const dirs = ['/system', '/system/apps', '/user/home', '/user/home/photos', '/user/home/dist', '/user/secure'];
      for (const d of dirs) if (!(await this.fs.exists(d))) await this.fs.mkdir(d);
      const apps: AppDefinition[] = [
        { id: 'git_sync', name: 'Replicator v15', icon: 'Zap', component: 'GitSyncApp', version: '15.13' },
        { id: 'terminal', name: 'Terminal', icon: 'Terminal', component: 'TerminalApp', version: '4.2' },
        { id: 'files', name: 'Explorer', icon: 'Folder', component: 'FilesApp', version: '4.1' },
        { id: 'settings', name: 'Settings', icon: 'Settings', component: 'SettingsApp', version: '4.5' },
        { id: 'music', name: 'Music', icon: 'Music', component: 'MusicApp', version: '1.0' },
        { id: 'video', name: 'Video', icon: 'Film', component: 'VideoPlayerApp', version: '1.0' },
        { id: 'ide', name: 'Studio', icon: 'Code', component: 'IDEApp', version: '1.2' },
        { id: 'clock', name: 'Clock', icon: 'Clock', component: 'ClockApp', version: '1.0' }
      ];
      for (const app of apps) await this.fs.write(`/system/apps/${app.id}.json`, JSON.stringify(app));
      await this.registry.set('apps.installed', apps.map(a => a.id));
      this.scheduler.start(); this._booted = true;
      this.history.record('kernel', 'Kernel v15.13 Apex Online.');
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