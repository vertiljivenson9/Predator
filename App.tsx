import React, { useEffect, useState } from 'react';
import { kernel } from './services/kernel';
import { Window } from './components/Window';
import { TerminalApp } from './apps/TerminalApp';
import { GitSyncApp } from './apps/GitSyncApp';
import { SettingsApp } from './apps/SettingsApp';
import { FilesApp } from './apps/FilesApp';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);
  useEffect(() => { kernel.boot().then(() => setBooted(true)); }, []);
  useEffect(() => {
    const h = (e: any) => {
      const { appId, args } = e.detail;
      setWindows(p => [...p, { id: crypto.randomUUID(), appId, title: appId.toUpperCase(), x: 50 + (p.length*20), y: 50 + (p.length*20), width: 800, height: 600, zIndex: 100 + p.length, args }]);
    };
    window.addEventListener('sys-launch-app', h as any);
    return () => window.removeEventListener('sys-launch-app', h as any);
  }, []);
  if (!booted) return <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-mono animate-pulse tracking-widest">SHARK_OS_BOOTING...</div>;
  return (
    <div className="h-screen w-screen bg-[#020202] relative overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564)', backgroundSize: 'cover' }}>
      <div className="p-10 flex gap-10">
        <div onClick={() => kernel.launchApp('terminal')} className="cursor-pointer flex flex-col items-center group"><div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-white font-black text-2xl group-hover:bg-white/20 transition-all shadow-xl">T</div><span className="text-[10px] text-white font-bold uppercase mt-2">Terminal</span></div>
        <div onClick={() => kernel.launchApp('git_sync')} className="cursor-pointer flex flex-col items-center group"><div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-black text-2xl group-hover:bg-indigo-600/40 transition-all shadow-xl">R</div><span className="text-[10px] text-indigo-400 font-bold uppercase mt-2">Replicator</span></div>
        <div onClick={() => kernel.launchApp('files')} className="cursor-pointer flex flex-col items-center group"><div className="w-16 h-16 bg-yellow-600/20 rounded-2xl flex items-center justify-center border border-yellow-500/20 text-yellow-400 font-black text-2xl group-hover:bg-yellow-600/40 transition-all shadow-xl">F</div><span className="text-[10px] text-yellow-400 font-bold uppercase mt-2">Explorer</span></div>
      </div>
      {windows.map(w => (
        <Window key={w.id} state={w} onClose={(id: string) => setWindows(p => p.filter(x => x.id !== id))} onFocus={() => {}}>
          {w.appId === 'terminal' && <TerminalApp />}
          {w.appId === 'git_sync' && <GitSyncApp />}
          {w.appId === 'files' && <FilesApp />}
          {w.appId === 'settings' && <SettingsApp />}
        </Window>
      ))}
    </div>
  );
}