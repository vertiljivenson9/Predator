import React, { useRef, useState, useEffect } from 'react';
import { Palette, Trash2, Save } from 'lucide-react';
export const PaintApp = () => {
  const c = useRef<HTMLCanvasElement>(null);
  useEffect(() => { if(c.current) { c.current.width = 800; c.current.height = 600; const ctx = c.current.getContext('2d'); if(ctx){ctx.fillStyle='white'; ctx.fillRect(0,0,800,600);} } }, []);
  return <div className="h-full flex flex-col bg-gray-200"><div className="h-12 bg-white border-b flex items-center px-4 gap-4"><Palette className="text-blue-500" /><div className="flex-1" /><Trash2 size={20} className="text-gray-400"/><Save size={20} className="text-blue-600"/></div><div className="flex-1 relative overflow-hidden"><canvas ref={c} className="absolute inset-0 w-full h-full cursor-crosshair" /></div></div>;
};