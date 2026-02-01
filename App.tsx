import React, { useEffect, useState } from 'react';
import { kernel } from './services/kernel';
import { Window } from './components/Window';
import { TerminalApp } from './apps/TerminalApp';
import { GitSyncApp } from './apps/GitSyncApp';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);

  useEffect(() => { kernel.boot().then(() => setBooted(true)); }, []);

  useEffect(() => {
    const h = (e: any) => {
      const { appId } = e.detail;
      setWindows(p => [...p, { id: Math.random().toString(), appId, title: appId.toUpperCase(), zIndex: 100 + p.length }]);
    };
    window.addEventListener('sys-launch-app', h as any);
    return () => window.removeEventListener('sys-launch-app', h as any);
  }, []);

  if (!booted) return <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-mono animate-pulse">SHARK_OS_V15.13_BOOTING...</div>;

  return (
    <div className="h-screen w-screen bg-[#020202] relative overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564)', backgroundSize: 'cover' }}>
      <div className="p-10 flex gap-8">
          <div onClick={() => kernel.launchApp('terminal')} className="cursor-pointer flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-white font-black">T</div>
            <span className="text-[10px] text-white font-bold uppercase">Terminal</span>
          </div>
          <div onClick={() => kernel.launchApp('git_sync')} className="cursor-pointer flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-black">R</div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase">Replicator</span>
          </div>
      </div>
      {windows.map(w => (
        <Window key={w.id} state={w} onClose={(id: string) => setWindows(p => p.filter(x => x.id !== id))}>
          {w.appId === 'terminal' ? <TerminalApp /> : <GitSyncApp />}
        </Window>
      ))}
    </div>
  );
}