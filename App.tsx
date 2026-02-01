import React, { useEffect, useState, useCallback } from 'react'; import { kernel } from './services/kernel'; import { Window } from './components/Window'; import { TerminalApp } from './apps/TerminalApp'; import { GitSyncApp } from './apps/GitSyncApp';
export default function App() {
  const [booted, setBooted] = useState(false); const [windows, setWindows] = useState([]);
  useEffect(() => { kernel.boot().then(() => setBooted(true)); }, []);
  useEffect(() => {
    const h = (e) => {
      const id = crypto.randomUUID();
      setWindows(p => [...p, { id, appId: e.detail.appId, title: e.detail.appId.toUpperCase(), x: 50 + (p.length*20), y: 50 + (p.length*20), width: 800, height: 600, zIndex: 100 + p.length }]);
    };
    window.addEventListener('sys-launch-app', h); return () => window.removeEventListener('sys-launch-app', h);
  }, []);
  if (!booted) return <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-mono tracking-widest">SHARK_OS_BOOTING...</div>;
  return (
    <div className="h-screen w-screen bg-[#020202] relative overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564)', backgroundSize: 'cover' }}>
      <div className="p-10 flex gap-10">
        <div onClick={() => kernel.launchApp('terminal')} className="cursor-pointer text-center"><div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-white font-black text-2xl">T</div><span className="text-[10px] text-white font-bold uppercase mt-2 block">Terminal</span></div>
        <div onClick={() => kernel.launchApp('git_sync')} className="cursor-pointer text-center"><div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-black text-2xl">G</div><span className="text-[10px] text-indigo-400 font-bold uppercase mt-2 block">Replicator</span></div>
      </div>
      {windows.map(w => (
        <Window key={w.id} state={w} onClose={(id) => setWindows(p => p.filter(x => x.id !== id))} onFocus={() => {}}>
          {w.appId === 'terminal' ? <TerminalApp /> : <GitSyncApp />}
        </Window>
      ))}
    </div>
  );
}