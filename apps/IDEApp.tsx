import React, { useState } from 'react';
import { Code, Play, Save, Box } from 'lucide-react';
export const IDEApp = () => (
  <div className="h-full bg-[#1e1e1e] text-gray-300 flex flex-col font-mono text-xs">
    <div className="h-10 bg-[#252526] border-b border-black flex items-center px-4 justify-between">
      <div className="flex items-center gap-4 font-bold text-blue-400"><Code size={16}/> Studio IDE</div>
      <div className="flex gap-2">
        <button className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded flex items-center gap-2"><Save size={12}/> Save</button>
        <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"><Play size={10}/> Build DNA</button>
      </div>
    </div>
    <div className="flex-1 flex overflow-hidden">
      <div className="w-12 bg-[#333333] border-r border-black flex flex-col items-center py-4 gap-4 text-gray-500"><Box size={18} className="text-white"/></div>
      <textarea className="flex-1 bg-transparent p-6 outline-none resize-none leading-relaxed text-[#d4d4d4]" defaultValue="// Shark OS v15.13 Runtime\nconst app = kernel.init();\n\nconsole.log('Isolated DNA active.');" spellCheck={false} />
    </div>
  </div>
);