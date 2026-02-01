import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
export const FilesApp: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  useEffect(() => { kernel.fs.ls('/').then(setFiles); }, []);
  return <div className="p-4 bg-white h-full">
    <div className="grid grid-cols-4 gap-4">
      {files.map(f => <div key={f} className="flex flex-col items-center p-2 hover:bg-blue-50 rounded">📁<span className="text-xs">{f}</span></div>)}
    </div>
  </div>;
};