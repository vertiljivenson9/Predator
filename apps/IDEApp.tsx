import React, { useState } from 'react';
import { Code, Play, Save } from 'lucide-react';
export const IDEApp = () => (
  <div className="h-full bg-[#1e1e1e] text-gray-300 flex flex-col font-mono">
    <div className="h-10 bg-[#252526] border-b border-black flex items-center px-4 justify-between">
      <div className="flex items-center gap-4 text-xs font-bold"><Code size={16} className="text-blue-400"/> Viscro Studio</div>
      <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2 text-[10px]"><Play size={10}/> Build</button>
    </div>
    <div className="flex-1 flex overflow-hidden"><div className="w-12 bg-[#333333] border-r border-black" /><textarea className="flex-1 bg-transparent p-6 outline-none resize-none text-sm leading-relaxed" defaultValue="// Welcome to WebOS Runtime\nconsole.log('Shark OS Active');" spellCheck={false} /></div>
  </div>
);