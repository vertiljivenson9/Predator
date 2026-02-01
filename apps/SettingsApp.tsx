import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Monitor, Lock, Cpu, Smartphone, Zap } from 'lucide-react';
export const SettingsApp: React.FC = () => {
  const [tab, setTab] = useState('display');
  return (
    <div className="h-full flex bg-[#020202] text-gray-200 font-sans select-none">
      <div className="w-16 sm:w-48 border-r border-white/5 bg-black flex flex-col">
        <div className="p-4 flex flex-col gap-2">
          <button onClick={() => setTab('display')} className={`p-3 rounded-xl ${tab==='display'?'bg-blue-600 text-white':'text-gray-500'}`}><Monitor size={20}/></button>
          <button onClick={() => setTab('security')} className={`p-3 rounded-xl ${tab==='security'?'bg-emerald-600 text-white':'text-gray-500'}`}><Lock size={20}/></button>
          <button onClick={() => setTab('system')} className={`p-3 rounded-xl ${tab==='system'?'bg-purple-600 text-white':'text-gray-500'}`}><Cpu size={20}/></button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        {tab === 'display' && <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-black uppercase">Entorno Visual</h2>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
            <p className="text-xs font-bold text-gray-400 mb-4">Brillo del Sistema</p>
            <input type="range" className="w-full h-2 bg-gray-800 rounded-lg appearance-none accent-blue-500" />
          </div>
        </div>}
        {tab === 'system' && <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-black uppercase">Núcleo Apex</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
              <Zap size={24} className="text-yellow-500 mx-auto mb-2"/>
              <span className="text-[10px] font-bold block uppercase text-gray-500">Arquitectura</span>
              <span className="text-xs font-black text-emerald-500">APEX_v15.13</span>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};