import React, { useState } from 'react';
import { Code, Play, Save } from 'lucide-react';
export const IDEApp = () => (
  <div className="h-full bg-[#1e1e1e] text-gray-300 flex flex-col font-mono">
    <div className="h-10 bg-[#252526] border-b border-black flex items-center px-4 justify-between">
      <div className="flex items-center gap-4 text-xs font-bold text-blue-400"><Code size={16}/> Studio IDE</div>
      <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest"><Play size={10}/> Build DNA</button>
    </div>
    <div className="flex-1 flex overflow-hidden">
      <div className="w-12 bg-[#333333] border-r border-black" />
      <textarea className="flex-1 bg-transparent p-6 outline-none resize-none text-sm leading-relaxed" defaultValue="// Welcome to WebOS Runtime\nconsole.log('Isolated DNA active.');" spellCheck={false} />
    </div>
  </div>
);