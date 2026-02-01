import React from 'react';
export const StatusBar: React.FC<any> = ({ onToggleControlCenter }) => {
  return <div onClick={onToggleControlCenter} className="h-6 bg-black/40 backdrop-blur-md text-white flex items-center justify-between px-4 text-[10px] fixed top-0 w-full z-[9000] font-bold">
    <span>12:00 PM</span>
    <div className="flex gap-2"><span>📶</span><span>🔋 100%</span></div>
  </div>;
};