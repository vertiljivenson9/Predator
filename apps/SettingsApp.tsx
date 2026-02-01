import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Monitor, Lock, Cpu, Key, Download, Save, Smartphone, ShieldCheck, Zap, Trash2, Fingerprint, Activity } from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'display' | 'security' | 'system'>('display');
  const [pin, setPin] = useState('');
  const [hasPin, setHasPin] = useState(false);
  const [br, setBr] = useState(100);
  const [wp, setWp] = useState('');

  useEffect(() => {
    const load = async () => {
        const storedPin = await kernel.registry.get('system.security.pin');
        if (storedPin) { setPin(storedPin); setHasPin(true); }
        setBr(await kernel.registry.get('user.display.brightness') || 100);
    };
    load();
  }, []);

  const handleSetPin = async () => {
    if (pin.length < 4) return alert("Mínimo 4 dígitos");
    await kernel.registry.set('system.security.pin', pin);
    setHasPin(true);
  };

  const downloadApexKey = () => {
    const keyData = { header: "APEX_OS_SECURITY_TOKEN_v1", payload: btoa(`pin:${pin}`) };
    const blob = new Blob([JSON.stringify(keyData)], { type: 'application/apex-key' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = "SharkMaster.apexkey";
    a.click();
  };

  return (
    <div className="h-full flex bg-black text-gray-200 overflow-hidden">
      <div className="w-16 sm:w-56 border-r border-white/5 bg-black flex flex-col shrink-0 p-2">
          <button onClick={() => setActiveTab('display')} className="p-4 hover:bg-white/5 rounded-xl flex items-center gap-3"><Monitor size={20}/> <span className="hidden sm:inline text-xs font-black uppercase">Pantalla</span></button>
          <button onClick={() => setActiveTab('security')} className="p-4 hover:bg-white/5 rounded-xl flex items-center gap-3"><Lock size={20}/> <span className="hidden sm:inline text-xs font-black uppercase">Seguridad</span></button>
          <button onClick={() => setActiveTab('system')} className="p-4 hover:bg-white/5 rounded-xl flex items-center gap-3"><Cpu size={20}/> <span className="hidden sm:inline text-xs font-black uppercase">Sistema</span></button>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'security' && (
          <div className="max-w-md space-y-6">
            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3"><Lock className="text-emerald-500"/> Crypto Base</h2>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
               <label className="text-[10px] font-black text-gray-500 uppercase">PIN Maestro</label>
               <input type="password" value={pin} onChange={e => setPin(e.target.value)} maxLength={6} className="w-full bg-black border border-white/10 p-4 rounded-xl text-center text-2xl tracking-[0.5em]"/>
               <button onClick={handleSetPin} className="w-full py-4 bg-emerald-600 rounded-xl font-black uppercase text-xs">Activar Cifrado</button>
            </div>
            {hasPin && (
              <div className="bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/20 text-center space-y-4">
                 <Key size={32} className="mx-auto text-emerald-500"/>
                 <h3 className="text-xs font-black uppercase">Generar ApexKey</h3>
                 <button onClick={downloadApexKey} className="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-xs">Descargar Llave .apexkey</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};