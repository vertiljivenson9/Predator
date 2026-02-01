import React, { useEffect, useState, useCallback } from 'react';
import { kernel } from './services/kernel';
import { WindowState, AppDefinition } from './types';
import { Window } from './components/Window';
import { StatusBar } from './components/StatusBar';
import { LockScreen } from './components/LockScreen';
import { BiosScreen } from './components/BiosScreen';
import { ControlCenter } from './components/ControlCenter';
import { SplashScreen } from './components/SplashScreen';
// Imports de Apps...
import { TerminalApp } from './apps/TerminalApp';
import { FilesApp } from './apps/FilesApp';
import { SettingsApp } from './apps/SettingsApp';
// ... (Resto de imports reales)

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564');
  const [brightness, setBrightness] = useState(100);
  const [installedApps, setInstalledApps] = useState<AppDefinition[]>([]);
  const [windows, setWindows] = useState<WindowState[]>([]);

  const syncHardware = useCallback(async () => {
    const wp = await kernel.registry.get('user.desktop.wallpaper');
    if (wp) setWallpaper(wp);
    const br = await kernel.registry.get('user.display.brightness');
    if (br !== undefined) setBrightness(br);
  }, []);

  useEffect(() => {
    window.addEventListener('sys-config-update', syncHardware);
    return () => window.removeEventListener('sys-config-update', syncHardware);
  }, [syncHardware]);

  const startBoot = async () => {
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

  return (
    <div className="h-screen w-screen overflow-hidden bg-black" style={{ filter: `brightness(${brightness}%)` }}>
      {isLocked && <LockScreen wallpaper={wallpaper} onUnlock={() => setIsLocked(false)} />}
      <div className="h-full w-full" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
         <StatusBar />
         {/* Renderizado de ventanas y escritorio... */}
      </div>
    </div>
  );
};
export default App;