import React, { useEffect, useState, useCallback } from 'react';
import { kernel } from './services/kernel';
import { WindowState, AppDefinition } from './types';
import { Window } from './components/Window';
import { StatusBar } from './components/StatusBar';
import { LockScreen } from './components/LockScreen';
import { BiosScreen } from './components/BiosScreen';
import { SplashScreen } from './components/SplashScreen';
import { SettingsApp } from './apps/SettingsApp';
import { GitSyncApp } from './apps/GitSyncApp';
import { Terminal, Folder, Settings, Zap, Grid } from 'lucide-react';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [installedApps, setInstalledApps] = useState<AppDefinition[]>([]);
  const [activeWinId, setActiveWinId] = useState<string | null>(null);

  const launchApp = useCallback((app: AppDefinition, args?: any) => {
    setWindows(prev => {
      const existing = prev.find(w => w.appId === app.id);
      if (existing) {
          setActiveWinId(existing.id);
          return prev.map(w => w.id === existing.id ? { ...w, isMinimized: false, zIndex: Math.max(...prev.map(x => x.zIndex)) + 1 } : w);
      }
      const id = crypto.randomUUID();
      const isMobile = window.innerWidth < 768;
      const newWin: WindowState = { 
          id, appId: app.id, title: app.name, 
          x: isMobile ? '2vw' : 50, y: isMobile ? 50 : 50, 
          width: isMobile ? '96vw' : 800, height: isMobile ? '80vh' : 600, 
          isMinimized: false, isMaximized: false, zIndex: 200, processId: 1, args 
      };
      setActiveWinId(id);
      return [...prev, newWin];
    });
  }, []);

  useEffect(() => {
    const boot = async () => {
      await kernel.boot();
      const ids = await kernel.registry.get('apps.installed') || [];
      const loaded = [];
      for(const id of ids) {
        try {
          const c = await kernel.fs.cat(`/system/apps/${id}.json`);
          loaded.push(JSON.parse(c));
        } catch(e) {}
      }
      setInstalledApps(loaded);
      setBooted(true);
    };
    boot();
  }, []);

  if (!booted) return <div className="h-screen bg-black" />;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0a0a] relative">
      <StatusBar />
      <div className="absolute inset-0 p-4 pt-16 grid grid-cols-4 gap-4">
        {installedApps.map(app => (
          <div key={app.id} className="flex flex-col items-center cursor-pointer" onClick={() => launchApp(app)}>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 shadow-xl">
               <Zap className="text-blue-400" />
            </div>
            <span className="mt-2 text-[10px] text-white font-black uppercase tracking-widest">{app.name}</span>
          </div>
        ))}
      </div>
      {windows.map(win => (
        <Window key={win.id} state={win} onFocus={setActiveWinId} onClose={id => setWindows(p => p.filter(w => w.id !== id))}>
          {win.appId === 'settings' ? <SettingsApp /> : win.appId === 'git_sync' ? <GitSyncApp /> : <div className="p-4 text-white">App Placeholder</div>}
        </Window>
      ))}
    </div>
  );
};
export default App;