import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Monitor, Lock, Cpu, Key, Download, Fingerprint, Activity, ShieldCheck } from 'lucide-react';
export const SettingsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('display');
  const [pin, setPin] = useState('');
  const [hasPin, setHasPin] = useState(false);
  useEffect(() => {
    const load = async () => {
        const storedPin = await kernel.registry.get('system.security.pin');
        if (storedPin) { setPin(storedPin); setHasPin(true); }
    };
    load();
  }, []);
  const handleSetPin = async () => {
    await kernel.registry.set('system.security.pin', pin);
    setHasPin(true);
    alert("PIN_ACTIVO");
  };
  return (
    <div className="h-full flex bg-[#020202] text-gray-200 font-sans overflow-hidden">
      <div className="w-16 sm:w-56 border-r border-white/5 bg-black flex flex-col p-2">
        <button onClick={() => setActiveTab('display')} className="p-4 hover:bg-white/5 rounded-xl flex items-center gap-3"><Monitor size={20}/> <span className="hidden sm:inline text-xs font-black uppercase">Pantalla</span></button>
        <button onClick={() => setActiveTab('security')} className="p-4 hover:bg-white/5 rounded-xl flex items-center gap-3"><Lock size={20}/> <span className="hidden sm:inline text-xs font-black uppercase">Seguridad</span></button>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'security' && (
          <div className="max-w-md space-y-6">
            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3"><ShieldCheck className="text-emerald-500"/> Seguridad Núcleo</h2>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
               <label className="text-[10px] font-black text-gray-500 uppercase">PIN de Cifrado</label>
               <input type="password" value={pin} onChange={e => setPin(e.target.value)} maxLength={6} className="w-full bg-black border border-white/10 p-4 rounded-xl text-center text-2xl tracking-[0.5em] text-white"/>
               <button onClick={handleSetPin} className="w-full py-4 bg-blue-600 rounded-xl font-black uppercase text-xs">Sincronizar DNA</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};