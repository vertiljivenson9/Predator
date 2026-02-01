import React, { useEffect, useState, useCallback } from 'react';
import { kernel } from './services/kernel';
import { WindowState, AppDefinition } from './types';
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
import { MusicApp } from './apps/MusicApp';
import { VideoPlayerApp } from './apps/VideoPlayerApp';
import { PaintApp } from './apps/PaintApp';
import { StoreApp } from './apps/StoreApp';
import { WeatherApp } from './apps/WeatherApp';
import { NewsApp } from './apps/NewsApp';
import { TimelineApp } from './apps/TimelineApp';
import { SystemMonitorApp } from './apps/SystemMonitorApp';
import { ZipExportApp } from './apps/ZipExportApp';
import { ClockApp } from './apps/ClockApp';
import { Terminal, Folder, Settings, Search, Camera, Image, Calculator, Code, Zap, Grid, ShoppingCart, Globe, Music, Film, Cloud, Palette, History, Activity, Archive, Clock } from 'lucide-react';

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
  ShoppingCart: <ShoppingCart size={32} className="text-green-500" />,
  Globe: <Globe size={32} className="text-sky-400" />,
  Music: <Music size={32} className="text-pink-400" />,
  Film: <Film size={32} className="text-indigo-400" />,
  Cloud: <Cloud size={32} className="text-white" />,
  Palette: <Palette size={32} className="text-rose-400" />,
  History: <History size={32} className="text-emerald-400" />,
  Activity: <Activity size={32} className="text-lime-400" />,
  Archive: <Archive size={32} className="text-amber-600" />,
  Clock: <Clock size={32} className="text-blue-300" />,
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
  const [showControlCenter, setShowControlCenter] = useState(false);
  
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564');
  const [brightness, setBrightness] = useState(100);

  const syncHardware = useCallback(async () => {
    const wp = await kernel.registry.get('user.desktop.wallpaper');
    if (wp) setWallpaper(wp);
    const br = await kernel.registry.get('user.display.brightness');
    if (br !== undefined) setBrightness(Number(br));
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
    await syncHardware();
    setBooted(true);
  };

  useEffect(() => {
    window.addEventListener('sys-config-update', syncHardware);
    return () => window.removeEventListener('sys-config-update', syncHardware);
  }, [syncHardware]);

  const launchApp = useCallback((app: AppDefinition, args?: any) => {
    const id = crypto.randomUUID();
    const pid = kernel.spawnProcess(app.name);
    const newWin: WindowState = { id, appId: app.id, title: app.name, x: 50, y: 50, width: 750, height: 550, isMinimized: false, isMaximized: false, zIndex: 100 + windows.length, processId: pid, args };
    setWindows(prev => [...prev, newWin]);
    setActiveWinId(id);
  }, [windows.length]);

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
      case 'music': return <MusicApp file={win.args?.file} />;
      case 'video': return <VideoPlayerApp file={win.args?.file} />;
      case 'paint': return <PaintApp />;
      case 'store': return <StoreApp />;
      case 'weather': return <WeatherApp />;
      case 'news': return <NewsApp />;
      case 'timeline': return <TimelineApp />;
      case 'sys_mon': return <SystemMonitorApp />;
      case 'zip_export': return <ZipExportApp />;
      case 'clock': return <ClockApp />;
      case 'editor': return <EditorApp file={win.args?.file} />;
      default: return <div className="p-4 text-white font-mono">Module Ready: {win.appId}</div>;
    }
  };

  if (showBios) return <BiosScreen onComplete={startBoot} />;
  if (!booted) return <div className="h-screen bg-black text-blue-500 font-mono flex items-center justify-center animate-pulse tracking-[1em]">SHARK OS...</div>;

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black" style={{ filter: `brightness(${brightness}%)` }}>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <StatusBar onToggleControlCenter={() => setShowControlCenter(!showControlCenter)} />
      {isLocked && <LockScreen wallpaper={wallpaper} onUnlock={() => setIsLocked(false)} />}
      <div className="absolute inset-0" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 p-4 pt-16 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 content-start overflow-y-auto no-scrollbar">
            {installedApps.map(app => (
              <div key={app.id} className="flex flex-col items-center group cursor-pointer active:scale-90" onClick={() => launchApp(app)}>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all shadow-xl">
                  {ICONS[app.icon] || ICONS['Default']}
                </div>
                <span className="mt-2 text-[10px] font-bold text-gray-300 group-hover:text-white uppercase tracking-tighter text-center truncate w-full px-1">{app.name}</span>
              </div>
            ))}
          </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-20">
        {windows.map(win => (
            <Window key={win.id} state={win} onClose={closeWin} onMinimize={id => setWindows(p => p.map(w => w.id === id ? {...w, isMinimized:true} : w))} onMaximize={id => setWindows(p => p.map(w => w.id === id ? {...w, isMaximized:!w.isMaximized} : w))} onFocus={setActiveWinId} onUpdate={(id, up) => setWindows(p => p.map(w => w.id === id ? {...w, ...up} : w))}>
                {renderContent(win)}
            </Window>
        ))}
      </div>
    </div>
  );
};
export default App;