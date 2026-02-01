import React, { useState } from 'react';
import { Globe, Search, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
export const SearchApp: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com');
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-12 bg-gray-100 border-b flex items-center px-4 gap-4">
        <div className="flex gap-2 text-gray-500"><ArrowLeft size={16}/><ArrowRight size={16}/><RefreshCw size={16}/></div>
        <div className="flex-1 bg-white border rounded-full px-4 py-1 flex items-center gap-2">
          <Globe size={14} className="text-gray-400"/><input value={url} onChange={e => setUrl(e.target.value)} className="flex-1 text-sm outline-none" />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-gray-200">
        <Globe size={100} strokeWidth={1}/>
        <span className="text-xs font-black uppercase tracking-widest mt-4">Jedge Browser v99.0</span>
      </div>
    </div>
  );
};