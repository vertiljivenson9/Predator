import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';
export const StatusBar = () => {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="fixed top-0 w-full h-8 bg-black/40 backdrop-blur text-white flex items-center justify-between px-6 text-[10px] font-bold z-[9000] border-b border-white/5">
      <span>{t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <div className="flex items-center gap-4"><Wifi size={12}/><Battery size={14}/></div>
    </div>
  );
};