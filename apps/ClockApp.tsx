import React, { useState, useEffect } from 'react';
export const ClockApp = () => {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="h-full bg-black text-white flex flex-col items-center justify-center">
      <div className="text-8xl font-thin tracking-tighter tabular-nums">{t.toLocaleTimeString([], { hour12: false })}</div>
      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mt-4">{t.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}</div>
    </div>
  );
};