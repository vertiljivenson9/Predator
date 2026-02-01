import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
import { Save, RefreshCw } from 'lucide-react';
export const EditorApp: React.FC<{file?: string}> = ({ file }) => {
  const [path, setPath] = useState(file || '/user/home/notes.txt');
  const [content, setContent] = useState('');
  useEffect(() => { if(file) kernel.fs.cat(file).then(setContent); }, [file]);
  const save = async () => { await kernel.fs.write(path, content); kernel.notifications.push('Editor', 'Archivo guardado.'); };
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-gray-300 font-mono">
      <div className="h-10 bg-[#2d2d2d] border-b border-black flex items-center px-4 gap-4">
        <div className="flex-1 bg-black/30 px-3 py-1 rounded text-[10px] truncate">{path}</div>
        <button onClick={save} className="text-blue-400 hover:text-blue-300"><Save size={16}/></button>
      </div>
      <textarea value={content} onChange={e => setContent(e.target.value)} className="flex-1 bg-transparent p-6 outline-none resize-none text-sm" spellCheck={false} />
    </div>
  );
};