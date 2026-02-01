import React, { useEffect, useState, useCallback } from 'react';
import { kernel } from './services/kernel';
import { WindowState, AppDefinition } from './types';
import { Window } from './components/Window';
import { StatusBar } from './components/StatusBar';
import { SettingsApp } from './apps/SettingsApp';
import { GitSyncApp } from './apps/GitSyncApp';
import { TerminalApp } from './apps/TerminalApp';
import { FilesApp } from './apps/FilesApp';
import { Terminal, Folder, Settings, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [installedApps, setInstalledApps] = useState<AppDefinition[]>([]);
  const [activeWinId, setActiveWinId] = useState<string | null>(null);

  const launchApp = (app: AppDefinition) => {
    const id = crypto.randomUUID();
    setWindows(prev => [...prev, { id, appId: app.id, title: app.name, x: 50, y: 50, width: 800, height: 600, isMinimized: false, isMaximized: false, zIndex: 100, processId: 1 }]);
    setActiveWinId(id);
  };

  useEffect(() => {
    kernel.boot().then(async () => {
      const ids = await kernel.registry.get('apps.installed') || [];
      const loaded = [];
      for(const id of ids) {
        const c = await kernel.fs.cat(`/system/apps/${id}.json`);
        loaded.push(JSON.parse(c));
      }
      setInstalledApps(loaded);
      setBooted(true);
    });
  }, []);

  if (!booted) return null;

  return (
    <div className="h-screen w-screen bg-[#050505] overflow-hidden relative font-sans">
      <StatusBar />
      <div className="p-10 grid grid-cols-4 gap-6 pt-20">
        {installedApps.map(app => (
          <div key={app.id} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => launchApp(app)}>
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400">
               <Zap />
            </div>
            <span className="text-[10px] text-white font-black uppercase tracking-widest">{app.name}</span>
          </div>
        ))}
      </div>
      {windows.map(win => (
        <Window key={win.id} state={win} onFocus={setActiveWinId} onClose={id => setWindows(p => p.filter(w => w.id !== id))}>
          {win.appId === 'settings' ? <SettingsApp /> : win.appId === 'git_sync' ? <GitSyncApp /> : win.appId === 'terminal' ? <TerminalApp /> : win.appId === 'files' ? <FilesApp /> : null}
        </Window>
      ))}
    </div>
  );
};
export default App;