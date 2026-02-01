import React, { useEffect } from 'react';
export const BiosScreen: React.FC<any> = ({ onComplete }) => {
  useEffect(() => { setTimeout(onComplete, 2000); }, []);
  return <div className="fixed inset-0 bg-black text-gray-400 font-mono p-8 z-[10000] text-xs">
    <div>AMIBIOS(C) 2025</div>
    <div>Shark OS Mobile v4.0</div>
    <div className="mt-4 animate-pulse">Memory Test: 4096K OK</div>
  </div>;
};