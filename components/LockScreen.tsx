import React from 'react';
export const LockScreen: React.FC<any> = ({ onUnlock, wallpaper }) => {
  return <div onClick={onUnlock} className="fixed inset-0 z-[8000] bg-black text-white flex flex-col items-center justify-center" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
    <h1 className="text-8xl font-thin mb-4">12:00</h1>
    <p className="text-xs uppercase tracking-[0.5em] animate-pulse">Tap to Unlock</p>
  </div>;
};