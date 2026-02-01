import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
export const ClockApp = () => {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="h-full bg-black text-white flex flex-col items-center justify-center gap-4">
      <div className="text-7xl font-thin tracking-tighter tabular-nums">{t.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'})}</div>
      <div className="text-xs font-black uppercase tracking-[0.5em] text-gray-500">{t.toLocaleDateString([], {weekday:'long', day:'numeric', month:'long'})}</div>
    </div>
  );
};