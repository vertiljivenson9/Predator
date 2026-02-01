import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2 } from 'lucide-react';
import { kernel } from '../services/kernel';

export const MusicApp: React.FC<{file?: string}> = ({ file }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  
  useEffect(() => {
    if (file) kernel.fs.cat(file).then(src => { audioRef.current.src = src; audioRef.current.play(); setPlaying(true); });
    return () => audioRef.current.pause();
  }, [file]);

  return (
    <div className="h-full bg-indigo-900 text-white flex flex-col items-center justify-center p-6">
       <div className="w-48 h-48 bg-black/30 rounded-full flex items-center justify-center border-4 border-white/10 mb-6">
          <Music size={64} className="animate-pulse" />
       </div>
       <button onClick={() => { setPlaying(!playing); playing ? audioRef.current.pause() : audioRef.current.play(); }} className="w-16 h-16 bg-white text-indigo-900 rounded-full flex items-center justify-center">
          {playing ? <Pause size={32} fill="currentColor"/> : <Play size={32} fill="currentColor" className="ml-1"/>}
       </button>
    </div>
  );
};