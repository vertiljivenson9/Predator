import React, { useEffect, useState } from 'react';
import { kernel } from './services/kernel';
import { Window } from './components/Window';
import { StatusBar } from './components/StatusBar';
import { TerminalApp } from './apps/TerminalApp';
import { GitSyncApp } from './apps/GitSyncApp';
import { FilesApp } from './apps/FilesApp';
import { SettingsApp } from './apps/SettingsApp';
import { MusicApp } from './apps/MusicApp';
import { VideoPlayerApp } from './apps/VideoPlayerApp';
import { IDEApp } from './apps/IDEApp';
import { ClockApp } from './apps/ClockApp';
import { Zap, Terminal, Folder, Settings, Music, Film, Code, Clock } from 'lucide-react';

const ICONS: Record<string, any> = { Terminal, Folder, Settings, Music, Film, Code, Clock, Zap };

export default function App() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => { 
    kernel.boot().then(async () => {
      const ids = await kernel.registry.get('apps.installed') || [];
      const loaded = [];
      for(const id of ids) {
        const c = await kernel.fs.cat(`/system/apps/${id}.json`);
        loaded.push(JSON.parse(c));
      }
      setApps(loaded); setBooted(true);
    });
  }, []);

  const launch = (app: any, args?: any) => {
    setWindows(p => {
      const ex = p.find(w => w.appId === app.id);
      if(ex) return p.map(w => w.id === ex.id ? {...w, isMinimized: false, zIndex: 200} : w);
      return [...p, { id: crypto.randomUUID(), appId: app.id, title: app.name, x: 50+(p.length*20), y: 60+(p.length*20), width: 800, height: 600, zIndex: 100+p.length, args }];
    });
  };

  if (!booted) return <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-mono animate-pulse tracking-widest uppercase">Shark OS Booting...</div>;

  return (
    <div className="h-screen w-screen bg-[#020202] relative overflow-hidden font-sans" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564)', backgroundSize: 'cover' }}>
      <StatusBar />
      <div className="absolute inset-0 p-8 pt-16 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-10 content-start">
        {apps.map(app => (
          <div key={app.id} onClick={() => launch(app)} className="flex flex-col items-center gap-3 cursor-pointer group active:scale-95 transition-all">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-white/20 transition-all">
              {ICONS[app.icon] ? React.createElement(ICONS[app.icon], { size: 32, className: 'text-white' }) : <Zap size={32} className="text-white" />}
            </div>
            <span className="text-[10px] font-black text-white/80 uppercase tracking-widest text-center truncate w-full">{app.name}</span>
          </div>
        ))}
      </div>
      {windows.map(win => (
        <Window key={win.id} state={win} onClose={id => setWindows(p => p.filter(w => w.id !== id))} onMinimize={id => setWindows(p => p.map(w => w.id === id ? {...w, isMinimized: true} : w))} onMaximize={id => setWindows(p => p.map(w => w.id === id ? {...w, isMaximized: !w.isMaximized} : w))} onFocus={() => {}}>
          {win.appId === 'terminal' && <TerminalApp />}
          {win.appId === 'git_sync' && <GitSyncApp />}
          {win.appId === 'files' && <FilesApp />}
          {win.appId === 'settings' && <SettingsApp />}
          {win.appId === 'music' && <MusicApp file={win.args?.file} />}
          {win.appId === 'video' && <VideoPlayerApp file={win.args?.file} />}
          {win.appId === 'ide' && <IDEApp />}
          {win.appId === 'clock' && <ClockApp />}
        </Window>
      ))}
    </div>
  );
}