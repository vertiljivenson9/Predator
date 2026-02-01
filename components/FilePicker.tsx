import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Folder, File, X } from 'lucide-react';
export const FilePicker = ({ onSelect, onCancel }: any) => {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => { kernel.fs.ls('/user/home').then(setItems); }, []);
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-6">
      <div className="bg-[#1e293b] border border-white/10 w-96 rounded-2xl shadow-2xl flex flex-col">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <span className="text-xs font-black uppercase text-white">Seleccionar Archivo</span>
          <button onClick={onCancel} className="text-gray-400 hover:text-white"><X size={16}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {items.map(item => (
            <div key={item} onClick={() => onSelect('/user/home/'+item)} className="p-3 hover:bg-white/5 rounded-xl flex items-center gap-3 cursor-pointer text-gray-300">
              {item.endsWith('/') ? <Folder size={16} className="text-yellow-500"/> : <File size={16} className="text-blue-500"/>}
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};