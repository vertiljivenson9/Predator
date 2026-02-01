import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Lock, ShieldCheck } from 'lucide-react';
export const SettingsApp: React.FC = () => {
  const [pin, setPin] = useState('');
  useEffect(() => {
    kernel.registry.get('system.security.pin').then(p => p && setPin(p));
  }, []);
  const save = () => kernel.registry.set('system.security.pin', pin).then(() => alert("PIN_SYNCED"));
  return (
    <div className="h-full bg-black p-10 text-white">
      <h2 className="text-xl font-black mb-6 uppercase flex items-center gap-3"><ShieldCheck className="text-emerald-500"/> Core Security</h2>
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 max-w-sm">
        <label className="text-[10px] font-black uppercase text-gray-500 block mb-2">PIN Maestro</label>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} maxLength={6} className="w-full bg-black border border-white/10 p-4 rounded-xl text-2xl tracking-[0.5em] text-center mb-4"/>
        <button onClick={save} className="w-full py-4 bg-blue-600 rounded-xl font-black uppercase text-xs">Guardar DNA</button>
      </div>
    </div>
  );
};