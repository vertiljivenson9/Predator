import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Monitor, Battery, Cpu, Image, Sun, Power, Info, Save, Check, Volume2, VolumeX, HardDrive, Trash2, Speaker, ShieldAlert, AlertTriangle, Lock, Activity, Wifi, Clock, Server, User, Database, RefreshCw, Moon, Zap, Smartphone, Type, Binary, ShieldCheck, Smartphone as MobileIcon, Key, Settings } from 'lucide-react';

type Section = 'display' | 'sound' | 'power' | 'storage' | 'security' | 'system' | 'dna';

const WALLPAPERS = [
  { name: 'Apex Dark', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564' },
  { name: 'Oceanic', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000' },
  { name: 'Night City', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=2000' },
  { name: 'Nebula', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000' }
];

export const SettingsApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('display');
  const [toast, setToast] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState('');
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);
  const [storageStats, setStorageStats] = useState({ used: 0, total: 512 * 1024 * 1024, fileCount: 0 });
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    loadSettings();
    updateStorageStats();
    const interval = setInterval(() => setUptime(Date.now() - kernel.bootTime), 1000);
    return () => clearInterval(interval);
  }, []);

  const loadSettings = async () => {
    const r = kernel.registry;
    setWallpaper(await r.get('user.desktop.wallpaper') || WALLPAPERS[0].url);
    setBrightness(await r.get('user.display.brightness') || 100);
    setVolume(Math.round((await r.get('system.audio.volume') || 0.8) * 100));
  };

  const updateStorageStats = async () => {
    const list = await kernel.fs.ls('/');
    setStorageStats(prev => ({ ...prev, used: list.length * 1024 * 4, fileCount: list.length }));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const save = async (key: string, value: any) => {
    await kernel.registry.set(key, value);
    window.dispatchEvent(new CustomEvent('sys-config-update'));
    showToast(`Config: ${key.split('.').pop()} sync success`);
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'display':
        return (
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <label className="text-[10px] uppercase text-gray-500 font-bold mb-3 block tracking-widest">Desktop Wallpaper</label>
              <div className="grid grid-cols-2 gap-2">
                {WALLPAPERS.map((wp) => (
                  <button key={wp.name} onClick={() => { setWallpaper(wp.url); save('user.desktop.wallpaper', wp.url); }} className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all">
                    <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1 text-[10px] text-white text-center font-bold">{wp.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block flex justify-between">
                <span>Screen Brightness</span>
                <span className="text-blue-400">{brightness}%</span>
              </label>
              <input type="range" min="10" max="100" value={brightness} onChange={(e) => { setBrightness(Number(e.target.value)); save('user.display.brightness', Number(e.target.value)); }} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
            </div>
          </div>
        );
      case 'dna':
        return (
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
               <label className="text-[10px] uppercase text-gray-500 font-bold mb-3 block tracking-widest">DNA Integridad (Quine-Protocol)</label>
               <div className="flex items-center gap-3 text-emerald-400 mb-4 bg-emerald-900/10 p-3 rounded-lg border border-emerald-900/20">
                  <ShieldCheck size={20} />
                  <div><p className="text-xs font-bold">Protocolo Apex Activo</p><p className="text-[9px] opacity-70">El código fuente es autoportante e íntegro.</p></div>
               </div>
               <div className="space-y-1 text-[10px]">
                 <div className="flex justify-between py-1 border-b border-white/5"><span className="text-gray-500">Módulos Indexados</span><span className="text-white font-mono">59</span></div>
                 <div className="flex justify-between py-1 border-b border-white/5"><span className="text-gray-500">Versión de DNA</span><span className="text-white font-mono">APEX_v13_MASTER</span></div>
               </div>
            </div>
          </div>
        );
      default: return <div className="p-8 text-center text-gray-600 uppercase text-[10px] font-black tracking-[1em]">W.I.P</div>;
    }
  };

  const NavItem = ({ id, icon: Icon, label }: any) => (
    <button onClick={() => setActiveSection(id)} className={`w-full flex items-center px-4 py-3 mb-1 rounded-xl transition-all ${activeSection === id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-gray-500 hover:bg-white/5'}`}>
      <Icon size={18} className="mr-4" />
      <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="flex h-full w-full bg-[#050505] text-gray-200 font-sans select-none relative overflow-hidden">
      {toast && <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-2xl z-50 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">{toast}</div>}
      <div className="w-56 bg-black border-r border-white/5 flex flex-col p-4">
        <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-6 px-4 flex items-center gap-2"><Settings size={12}/> Apex_Core</h2>
        <nav className="flex-1">
            <NavItem id="display" icon={Monitor} label="Display" />
            <NavItem id="sound" icon={Volume2} label="Sound" />
            <NavItem id="storage" icon={HardDrive} label="Storage" />
            <NavItem id="dna" icon={Binary} label="DNA Integridad" />
            <NavItem id="system" icon={Cpu} label="System" />
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-black to-[#0a0a0a] p-8"><div className="max-w-xl">{renderSection()}</div></div>
    </div>
  );
};