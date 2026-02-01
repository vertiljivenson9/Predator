import React, { useEffect, useState, useCallback } from 'react';
import { kernel } from './services/kernel';
import { WindowState, AppDefinition } from './types';
import { Window } from './components/Window';
import { StatusBar } from './components/StatusBar';
import { LockScreen } from './components/LockScreen';
import { BiosScreen } from './components/BiosScreen';
import { SplashScreen } from './components/SplashScreen';
import { ControlCenter } from './components/ControlCenter';
import { TerminalApp } from './apps/TerminalApp';
import { EditorApp } from './apps/EditorApp';
import { SettingsApp } from './apps/SettingsApp';
import { FilesApp } from './apps/FilesApp';
import { SearchApp } from './apps/SearchApp';
import { CameraApp } from './apps/CameraApp';
import { GalleryApp } from './apps/GalleryApp';
import { CalculatorApp } from './apps/CalculatorApp';
import { IDEApp } from './apps/IDEApp';
import { GitSyncApp } from './apps/GitSyncApp';
import { MusicApp } from './apps/MusicApp';
import { VideoPlayerApp } from './apps/VideoPlayerApp';
import { PaintApp } from './apps/PaintApp';
import { NewsApp } from './apps/NewsApp';
import { TimelineApp } from './apps/TimelineApp';
import { SystemMonitorApp } from './apps/SystemMonitorApp';
import { Terminal, Folder, Settings, Search, Camera, Image, Calculator, Code, Zap, Grid, Globe, Music, Film, Cloud, Palette, History, Activity, Clock } from 'lucide-react';

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
  Globe: <Globe size={32} className="text-sky-400" />,
  Music: <Music size={32} className="text-pink-400" />,
  Film: <Film size={32} className="text-indigo-400" />,
  Palette: <Palette size={32} className="text-rose-400" />,
  History: <History size={32} className="text-emerald-400" />,
  Activity: <Activity size={32} className="text-lime-400" />,
  Default: <Grid size={32} className="text-gray-500" />
};

const App: React.FC = () => {
  const [showBios, setShowBios] = useState(true);
  const [booted, setBooted] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [installedApps, setInstalledApps] = useState<AppDefinition[]>([]);
  const [activeWinId, setActiveWinId] = useState<string | null>(null);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564');
  const [brightness, setBrightness] = useState(100);

  const focusWin = useCallback((id: string) => {
    setActiveWinId(id);
    setWindows(prev => {
        const maxZ = Math.max(...prev.map(w => w.zIndex), 100);
        return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
    });
  }, []);

  const closeWin = useCallback((id: string) => {
    setWindows(prev => {
        const w = prev.find(x => x.id === id);
        if (w) kernel.killProcess(w.processId);
        return prev.filter(x => x.id !== id);
    });
    setActiveWinId(prev => prev === id ? null : prev);
  }, []);

  const launchApp = useCallback((app: AppDefinition, args?: any) => {
    setWindows(prev => {
      const existing = prev.find(w => w.appId === app.id);
      if (existing) {
          const maxZ = Math.max(...prev.map(w => w.zIndex), 100);
          setActiveWinId(existing.id);
          return prev.map(w => w.id === existing.id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
      }
      const id = crypto.randomUUID();
      const pid = kernel.spawnProcess(app.name);
      const isMobile = window.innerWidth < 768;
      const newWin: WindowState = { 
          id, appId: app.id, title: app.name, 
          x: isMobile ? '2vw' : 40 + (prev.length * 30), 
          y: isMobile ? 50 : 60 + (prev.length * 30), 
          width: isMobile ? '96vw' : 780, 
          height: isMobile ? '78vh' : 580, 
          isMinimized: false, isMaximized: false, 
          zIndex: Math.max(...prev.map(w => w.zIndex), 100) + 1, 
          processId: pid, args 
      };
      setActiveWinId(id);
      return [...prev, newWin];
    });
  }, []);

  const startBoot = async () => {
    setShowBios(false);
    setShowSplash(true);
    await kernel.boot();
    const ids = await kernel.registry.get('apps.installed') || [];
    const loaded = [];
    for(const id of ids) {
       const c = await kernel.fs.cat(`/system/apps/${id}.json`);
       loaded.push(JSON.parse(c));
    }
    setInstalledApps(loaded);
    setBooted(true);
  };

  useEffect(() => {
    const handleLaunch = (e: any) => {
      const { appId, args } = e.detail;
      const app = installedApps.find(a => a.id === appId);
      if (app) launchApp(app, args);
    };
    window.addEventListener('sys-launch-app', handleLaunch as any);
    return () => window.removeEventListener('sys-launch-app', handleLaunch as any);
  }, [installedApps, launchApp]);

  const renderContent = (win: WindowState) => {
    switch(win.appId) {
      case 'settings': return <SettingsApp />;
      case 'terminal': return <TerminalApp />;
      case 'files': return <FilesApp />;
      case 'search': return <SearchApp />;
      case 'gallery': return <GalleryApp />;
      case 'calculator': return <CalculatorApp />;
      case 'git_sync': return <GitSyncApp />;
      case 'video': return <VideoPlayerApp file={win.args?.file} />;
      case 'paint': return <PaintApp />;
      case 'news': return <NewsApp />;
      case 'timeline': return <TimelineApp />;
      case 'sys_mon': return <SystemMonitorApp />;
      default: return <div className="p-4 text-white font-mono text-xs">Runtime Error: Missing Component {win.appId}</div>;
    }
  };

  if (showBios) return <BiosScreen onComplete={startBoot} />;
  if (!booted) return <div className="h-screen bg-black text-blue-500 font-mono flex items-center justify-center animate-pulse tracking-[0.5em]">SHARK_OS...</div>;

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black" style={{ filter: `brightness(${brightness}%)` }}>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <StatusBar onToggleControlCenter={() => setShowControlCenter(!showControlCenter)} />
      {isLocked && <LockScreen wallpaper={wallpaper} onUnlock={() => setIsLocked(false)} />}
      <div className="absolute inset-0" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 p-4 pt-16 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 content-start overflow-y-auto no-scrollbar pb-32">
            {installedApps.map(app => (
              <div key={app.id} className="flex flex-col items-center group cursor-pointer active:scale-90 transition-all" onClick={() => launchApp(app)}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-[1.5rem] flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all shadow-xl">
                  <div className="scale-75 sm:scale-100">{ICONS[app.icon] || ICONS['Default']}</div>
                </div>
                <span className="mt-2 text-[8px] sm:text-[9px] font-black text-white/80 group-hover:text-white uppercase tracking-widest text-center truncate w-full px-1 drop-shadow-md">{app.name}</span>
              </div>
            ))}
          </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-20 flex justify-center">
        {windows.map(win => (
            <Window key={win.id} state={win} onClose={closeWin} onMinimize={id => {}} onMaximize={id => {}} onFocus={focusWin} onUpdate={(id, up) => {}}>
                {renderContent(win)}
            </Window>
        ))}
      </div>
    </div>
  );
};
export default App;