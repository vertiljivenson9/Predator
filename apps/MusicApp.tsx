import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { kernel } from '../services/kernel';
export const MusicApp: React.FC<{file?: string}> = ({ file }) => {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(new Audio());
  useEffect(() => { if(file) kernel.fs.cat(file).then(s => { audio.current.src = s; audio.current.play(); setPlaying(true); }); }, [file]);
  return (
    <div className="h-full bg-indigo-950 text-white flex flex-col items-center justify-center p-8">
      <div className="w-48 h-48 bg-black/40 rounded-full flex items-center justify-center border-4 border-white/10 mb-10 shadow-2xl">
        <Music size={64} className={playing ? 'animate-pulse' : 'opacity-20'} />
      </div>
      <button onClick={() => { setPlaying(!playing); playing ? audio.current.pause() : audio.current.play(); }} className="w-20 h-20 bg-white text-indigo-950 rounded-full flex items-center justify-center shadow-2xl">
        {playing ? <Pause size={32} fill="currentColor"/> : <Play size={32} fill="currentColor" className="ml-2"/>}
      </button>
    </div>
  );
};