import React, { useState, useEffect } from 'react';
import { Lock, ChevronUp } from 'lucide-react';
export const LockScreen: React.FC<any> = ({ onUnlock, wallpaper }) => {
  const [deltaY, setDeltaY] = useState(0);
  // Lógica de arrastre quirúrgica para desbloqueo
  return (
    <div className="fixed inset-0 z-[8000] transition-transform" style={{ backgroundImage: `url(${wallpaper})`, transform: `translateY(-${deltaY}px)` }}>
       <div className="h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <Lock size={48} className="text-blue-400 animate-pulse" />
          <h1 className="text-7xl font-thin mt-4">12:00</h1>
       </div>
    </div>
  );
};