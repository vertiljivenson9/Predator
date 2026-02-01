import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Mic } from 'lucide-react';
export const StatusBar = ({ onToggleControlCenter }: any) => {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="fixed top-0 w-full h-6 bg-black/40 backdrop-blur text-white flex items-center justify-between px-4 text-[10px] font-bold z-[9000] cursor-pointer" onClick={onToggleControlCenter}>
      <span>{t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <div className="flex items-center gap-3"><Mic size={10}/><Wifi size={12}/><Battery size={14}/></div>
    </div>
  );
};