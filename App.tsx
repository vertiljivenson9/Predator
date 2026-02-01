import React, { useEffect, useState } from 'react'; 
import { kernel } from './services/kernel'; 
import { Window } from './components/Window'; 
import { TerminalApp } from './apps/TerminalApp'; 
import { GitSyncApp } from './apps/GitSyncApp';
import { FilesApp } from './apps/FilesApp';
import { SettingsApp } from './apps/SettingsApp';

export default function App() {
  const [booted, setBooted] = useState(false); 
  const [windows, setWindows] = useState([]);
  const [installed, setInstalled] = useState([]);

  useEffect(() => { 
    kernel.boot().then(async () => {
        const ids = await kernel.registry.get('apps.installed') || [];
        const loaded = [];
        for(const id of ids) {
            const c = await kernel.fs.cat(`/system/apps/${id}.json`);
            loaded.push(JSON.parse(c));
        }
        setInstalled(loaded);
        setBooted(true);
    }); 
  }, []);

  useEffect(() => {
    const h = (e: any) => {
      const { appId, args } = e.detail;
      const app = installed.find(a => a.id === appId);
      if (!app) return;
      setWindows(p => {
        if (p.find(w => w.appId === appId)) return p;
        const id = Math.random().toString(36).substr(2,9);
        return [...p, { id, appId, title: app.name, x: 100 + (p.length*20), y: 100 + (p.length*20), width: 700, height: 500, zIndex: 100 + p.length, args }];
      });
    };
    window.addEventListener('sys-launch-app', h as any); return () => window.removeEventListener('sys-launch-app', h as any);
  }, [installed]);

  const renderApp = (w: any) => {
      switch(w.appId) {
          case 'terminal': return <TerminalApp />;
          case 'git_sync': return <GitSyncApp />;
          case 'files': return <FilesApp />;
          case 'settings': return <SettingsApp />;
          default: return <div className="p-4 text-white font-mono text-xs">Error: App not found</div>;
      }
  }

  if (!booted) return <div className="h-screen bg-black flex items-center justify-center text-indigo-500 font-mono tracking-[1em] animate-pulse">SHARK_OS</div>;

  return (
    <div className="h-screen w-screen bg-[#020202] overflow-hidden relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564)', backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      <div className="p-10 grid grid-cols-6 gap-8">
        {installed.map(app => (
            <div key={app.id} onClick={() => kernel.launchApp(app.id)} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/20 transition-all text-indigo-400 font-black">
                    {app.name[0].toUpperCase()}
                </div>
                <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">{app.name}</span>
            </div>
        ))}
      </div>
      {windows.map(w => (
        <Window key={w.id} state={w} onClose={(id) => setWindows(p => p.filter(x => x.id !== id))} onFocus={() => {}}>
          {renderApp(w)}
        </Window>
      ))}
    </div>
  );
}