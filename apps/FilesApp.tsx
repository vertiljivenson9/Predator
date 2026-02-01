import React, { useState, useEffect } from 'react';
import { Folder, File, HardDrive, Upload, Plus } from 'lucide-react';
import { kernel } from '../services/kernel';
export const FilesApp = () => {
  const [path, setPath] = useState('/user/home');
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => { kernel.fs.ls(path).then(setItems); }, [path]);
  return (
    <div className="h-full bg-white flex flex-col font-sans">
      <div className="h-12 border-b flex items-center px-4 gap-4 bg-gray-50"><HardDrive size={18} className="text-gray-400" /><div className="flex-1 bg-white border rounded px-3 py-1 text-xs text-gray-600 font-mono truncate">{path}</div></div>
      <div className="flex-1 overflow-auto p-6 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {items.map(item => (
          <div key={item} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => item.endsWith('/') ? setPath(p => p === '/' ? `/${item.slice(0,-1)}` : `${p}/${item.slice(0,-1)}`) : null}>
            <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform">{item.endsWith('/') ? <Folder className="text-yellow-400 fill-yellow-100" size={48} /> : <File className="text-blue-400" size={48} />}</div>
            <span className="text-[10px] text-gray-600 font-bold truncate w-full text-center">{item.replace('/','')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};