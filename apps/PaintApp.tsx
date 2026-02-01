import React, { useRef, useState, useEffect } from 'react';
import { Palette, Trash2, Save } from 'lucide-react';
export const PaintApp = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => { if(canvas.current) { const ctx = canvas.current.getContext('2d'); if(ctx){ ctx.fillStyle='white'; ctx.fillRect(0,0,800,600); } } }, []);
  return (
    <div className="h-full flex flex-col bg-gray-200">
      <div className="h-12 bg-white border-b flex items-center px-4 gap-6 z-10 shadow-sm">
        <Palette className="text-blue-500" size={20}/><div className="flex-1"/><button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={20}/></button><button className="p-2 bg-blue-600 text-white rounded-lg"><Save size={18}/></button>
      </div>
      <div className="flex-1 relative overflow-hidden bg-gray-300 p-4 flex items-center justify-center">
        <canvas ref={canvas} width={800} height={600} className="bg-white shadow-2xl cursor-crosshair rounded-sm" />
      </div>
    </div>
  );
};