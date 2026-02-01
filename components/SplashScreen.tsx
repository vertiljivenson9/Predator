import React, { useEffect } from 'react';
export const SplashScreen: React.FC<any> = ({ onComplete }) => {
  useEffect(() => { setTimeout(onComplete, 3000); }, []);
  return <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white">
    <h1 className="text-5xl font-black tracking-widest animate-pulse text-blue-500">SHARK OS</h1>
    <p className="text-[10px] mt-4 uppercase tracking-[0.3em]">Apex Edition</p>
  </div>;
};