import React, { useEffect, useState } from 'react'; import { kernel } from './services/kernel'; import { Window } from './components/Window'; import { TerminalApp } from './apps/TerminalApp'; import { GitSyncApp } from './apps/GitSyncApp';
export default function App() {
  const [booted, setBooted] = useState(false); const [windows, setWindows] = useState<any[]>([]);
  useEffect(() => { kernel.boot().then(() => setBooted(true)); }, []);
  useEffect(() => {
    const h = (e: any) => {
      const id = Math.random().toString(36).substr(2,9);
      setWindows(p => [...p, { id, appId: e.detail.appId, title: e.detail.appId.toUpperCase(), x: 100 + (p.length*20), y: 100 + (p.length*20), width: 700, height: 500, zIndex: 100 + p.length }]);
    };
    window.addEventListener('sys-launch-app', h as any); return () => window.removeEventListener('sys-launch-app', h as any);
  }, []);
  if (!booted) return <div className="h-screen bg-black flex items-center justify-center text-indigo-500 font-mono tracking-[1em] animate-pulse">PREDATOR_OS</div>;
  return (
    <div className="h-screen w-screen bg-[#020202] overflow-hidden relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564)', backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      <div className="p-10 grid grid-cols-6 gap-8">
        <div onClick={() => kernel.launchApp('terminal')} className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/20 transition-all text-indigo-400 font-black">T</div>
          <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">Terminal</span>
        </div>
        <div onClick={() => kernel.launchApp('git_sync')} className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600 transition-all text-white font-black">G</div>
          <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Replicator</span>
        </div>
      </div>
      {windows.map(w => (
        <Window key={w.id} state={w} onClose={(id: string) => setWindows(p => p.filter(x => x.id !== id))} onFocus={() => {}}>
          {w.appId === 'terminal' ? <TerminalApp /> : <GitSyncApp />}
        </Window>
      ))}
    </div>
  );
}