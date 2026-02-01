import React, { useEffect, useState, useCallback } from 'react';
import { kernel } from './services/kernel';
import { WindowState, AppDefinition, Notification } from './types';
import { Window } from './components/Window';
import { StatusBar } from './components/StatusBar';
import { LockScreen } from './components/LockScreen';
import { BiosScreen } from './components/BiosScreen';
import { ControlCenter } from './components/ControlCenter';
import { SplashScreen } from './components/SplashScreen';
import { TerminalApp } from './apps/TerminalApp';
import { EditorApp } from './apps/EditorApp';
import { SettingsApp } from './apps/SettingsApp';
import { SearchApp } from './apps/SearchApp';
import { FilesApp } from './apps/FilesApp';
import { CameraApp } from './apps/CameraApp';
import { GalleryApp } from './apps/GalleryApp';
import { CalculatorApp } from './apps/CalculatorApp';
import { IDEApp } from './apps/IDEApp';
import { GitSyncApp } from './apps/GitSyncApp';
import { Terminal, Folder, Settings, Search, Camera, Image, Calculator, Code, Zap, Grid } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={32} className="text-gray-300" />,
  Folder: <Folder size={32} className="text-yellow-400" />,
  Settings: <Settings size={32} className="text-gray-400" />,
  Search: <Search size={32} className="text-blue-400" />,
  Camera: <Camera size={32} className="text-red-400" />,
  Image: <Image size={32} className="text-purple-400" />,
  Calculator: <Calculator size={32} className="text-orange-400" />,
  Code: <Code size={32} className="text-blue-500" />,
  Zap: <Zap size={32} className="text-cyan-400" />,
  Default: <Grid size={32} className="text-gray-500" />
};

const App: React.FC = () => {
  const [showBios, setShowBios] = useState(true);
  const [booted, setBooted] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [installedApps, setInstalledApps] = useState<AppDefinition[]>([]);
  const [activeWinId, setActiveWinId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [wallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564');

  const startBoot = async () => {
    setShowBios(false);
    setShowSplash(true);
    try {
      await kernel.boot();
      const ids = await kernel.registry.get('apps.installed') || [];
      const loaded = [];
      for(const id of ids) {
        const c = await kernel.fs.cat(`/system/apps/${id}.json`);
        loaded.push(JSON.parse(c));
      }
      setInstalledApps(loaded);
      setBooted(true);
    } catch(e) { console.error(e); }
  };

  const launchApp = useCallback((app: AppDefinition, args?: any) => {
    const isMobile = window.innerWidth < 768;
    const id = crypto.randomUUID();
    const pid = kernel.spawnProcess(app.name);
    const width = isMobile ? window.innerWidth : (app.defaultWidth || 700);
    const height = isMobile ? window.innerHeight - 80 : (app.defaultHeight || 500);
    const x = isMobile ? 0 : (window.innerWidth / 2 - width / 2 + (windows.length * 20));
    const y = isMobile ? 24 : (window.innerHeight / 2 - height / 2 + (windows.length * 20));
    const newWin: WindowState = { id, appId: app.id, title: app.name, x, y, width, height, isMinimized: false, isMaximized: isMobile, zIndex: 100 + windows.length, processId: pid, args };
    setWindows(prev => [...prev, newWin]);
    setActiveWinId(id);
  }, [windows.length]);

  useEffect(() => {
    const handleLaunch = (e: any) => {
        const app = installedApps.find(a => a.id === e.detail.appId);
        if (app) launchApp(app, e.detail.args);
    };
    window.addEventListener('sys-launch-app', handleLaunch);
    return () => window.removeEventListener('sys-launch-app', handleLaunch);
  }, [installedApps, launchApp]);

  const updateWin = (id: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const focusWin = (id: string) => {
    setActiveWinId(id);
    setWindows(prev => {
        const maxZ = Math.max(...prev.map(w => w.zIndex), 100);
        return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
    });
  };

  const closeWin = (id: string) => {
    setWindows(prev => {
        const w = prev.find(x => x.id === id);
        if (w) kernel.killProcess(w.processId);
        return prev.filter(x => x.id !== id);
    });
    if (activeWinId === id) setActiveWinId(null);
  };

  const renderContent = (win: WindowState) => {
    switch(win.appId) {
      case 'terminal': return <TerminalApp />;
      case 'files': return <FilesApp />;
      case 'settings': return <SettingsApp />;
      case 'search': return <SearchApp />;
      case 'camera': return <CameraApp />;
      case 'gallery': return <GalleryApp />;
      case 'calculator': return <CalculatorApp />;
      case 'ide': return <IDEApp />;
      case 'git_sync': return <GitSyncApp />;
      case 'editor': return <EditorApp file={win.args?.file} />;
      default: return <div className="p-4">App Component Missing</div>;
    }
  };

  if (showBios) return <BiosScreen onComplete={startBoot} />;
  if (!booted) return <div className="h-screen bg-black text-blue-500 font-mono flex items-center justify-center animate-pulse uppercase tracking-[1em]">Shark OS Apex...</div>;

  return (
    <div className="h-screen w-screen bg-[#020617] overflow-hidden relative font-sans text-white select-none touch-none" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <StatusBar onToggleControlCenter={() => setShowControlCenter(!showControlCenter)} />
      <ControlCenter isOpen={showControlCenter} onClose={() => setShowControlCenter(false)} notifications={notifications} />
      {isLocked && <LockScreen wallpaper={wallpaper} onUnlock={() => setIsLocked(false)} />}
      <div className="absolute inset-0 p-4 pt-16 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-8 content-start z-10 overflow-y-auto no-scrollbar pb-32">
        {installedApps.map(app => (
          <div key={app.id} className="flex flex-col items-center group cursor-pointer transition-all active:scale-90" onClick={() => launchApp(app)}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-blue-500/50 shadow-xl transition-all">
              {ICONS[app.icon] || ICONS['Default']}
            </div>
            <span className="mt-2 text-[9px] sm:text-[10px] font-bold text-gray-300 group-hover:text-white uppercase tracking-tighter text-center truncate w-full px-1">{app.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none z-20">
        {windows.map(win => (
            <Window key={win.id} state={win} onClose={closeWin} onMinimize={id => updateWin(id, {isMinimized: true})} onMaximize={id => updateWin(id, {isMaximized: !win.isMaximized})} onFocus={focusWin} onUpdate={updateWin}>
                {renderContent(win)}
            </Window>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl px-3 py-2 flex items-center gap-3 shadow-2xl z-50 transition-all hover:bg-black/60 max-w-[95vw] overflow-x-auto no-scrollbar">
        {windows.map(win => (
            <div key={win.id} onClick={() => focusWin(win.id)} className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${activeWinId === win.id ? 'bg-blue-500/20 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 hover:bg-white/10'}`}>
                <div className="scale-[0.7] opacity-80">
                    {ICONS[installedApps.find(a => a.id === win.appId)?.icon || 'Default']}
                </div>
            </div>
        ))}
        <button onClick={() => setWindows(prev => prev.map(w => ({...w, isMinimized: true})))} className="p-2 text-gray-500 hover:text-white transition-colors shrink-0"><Grid size={18} /></button>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};
export default App;