import React, { useEffect, useState } from 'react';
export const SplashScreen = ({ onComplete }: any) => {
  const [w, setW] = useState(0);
  useEffect(() => { const i = setInterval(() => setW(p => p >= 100 ? 100 : p + 2), 50); setTimeout(onComplete, 3000); return () => clearInterval(i); }, []);
  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center">
      <div className="text-4xl font-black text-white tracking-[0.5em] mb-8">SHARK OS</div>
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${w}%` }} /></div>
    </div>
  );
};