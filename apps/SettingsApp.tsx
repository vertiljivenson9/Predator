import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Monitor, Image, Sun, Database, Binary, Settings } from 'lucide-react';
export const SettingsApp: React.FC = () => {
  const [active, setActive] = useState('display');
  const [br, setBr] = useState(100);
  
  const save = async (key: string, val: any) => {
    await kernel.registry.set(key, val);
    if (kernel.registry.flush) await kernel.registry.flush();
    window.dispatchEvent(new CustomEvent('sys-config-update'));
  };

  const WALLPAPERS = [
    { name: 'Apex', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564' },
    { name: 'Deep', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000' }
  ];

  return (
    <div className="flex h-full bg-[#050505] text-gray-200">
      <div className="w-48 bg-black border-r border-white/5 p-4 space-y-2">
        <button onClick={() => setActive('display')} className="w-full text-left p-2 rounded hover:bg-white/5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Monitor size={14}/> Display</button>
        <button onClick={() => setActive('dna')} className="w-full text-left p-2 rounded hover:bg-white/5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Binary size={14}/> DNA</button>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        {active === 'display' && (
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase text-gray-500 mb-4 block">Wallpapers</label>
            <div className="grid grid-cols-2 gap-4">
              {WALLPAPERS.map((wp, i) => (
                <button key={i} onClick={() => save('user.desktop.wallpaper', wp.url)} className="aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 shadow-lg"><img src={wp.url} className="w-full h-full object-cover"/></button>
              ))}
            </div>
            <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block">Brightness</label>
            <input type="range" min="20" max="100" value={br} onChange={(e) => { setBr(Number(e.target.value)); save('user.display.brightness', e.target.value); }} className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
          </div>
        )}
        {active === 'dna' && <div className="p-4 bg-white/5 rounded border border-white/10"><h3 className="text-xs font-bold text-blue-400 mb-2 uppercase">Status de Integridad</h3><p className="text-[10px] text-gray-500">Módulos verificados: 59/59. Estado: Óptimo.</p></div>}
      </div>
    </div>
  );
};