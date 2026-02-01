import React, { useEffect, useState } from 'react';
import { kernel } from './services/kernel';
import { Window } from './components/Window';
import { SettingsApp } from './apps/SettingsApp';
import { GitSyncApp } from './apps/GitSyncApp';
const App = () => {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);
  useEffect(() => { kernel.boot().then(() => setBooted(true)); }, []);
  const launch = (id: string) => setWindows([...windows, { id: Math.random(), appId: id, title: id, x: 50, y: 50, width: 800, height: 600, zIndex: 100 }]);
  if (!booted) return null;
  return <div className="h-screen bg-black relative"><button onClick={() => launch('git_sync')}>REPLICATOR</button>{windows.map(w => <Window key={w.id} state={w} onClose={() => {}} onFocus={() => {}}>{w.appId === 'git_sync' ? <GitSyncApp /> : <SettingsApp />}</Window>)}</div>;
};
export default App;