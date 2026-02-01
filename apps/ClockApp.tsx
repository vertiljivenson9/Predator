import React, { useState, useEffect } from 'react';
export const ClockApp = () => {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="h-full bg-[#050505] text-white flex flex-col items-center justify-center">
      <div className="text-8xl font-thin tracking-tighter tabular-nums mb-4">{t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
      <div className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-500">{t.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}</div>
    </div>
  );
};