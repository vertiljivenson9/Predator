import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { kernel } from '../services/kernel';
export const VideoPlayerApp: React.FC<{file?: string}> = ({ file }) => {
  const vRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { if(file) kernel.fs.cat(file).then(s => { vRef.current!.src = s; vRef.current!.play(); setPlaying(true); }); }, [file]);
  return (
    <div className="h-full bg-black flex flex-col items-center justify-center text-white relative">
      <video ref={vRef} playsInline className="w-full h-full object-contain" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6">
        <button onClick={() => { setPlaying(!playing); playing ? vRef.current?.pause() : vRef.current?.play(); }} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
          {playing ? <Pause size={24} fill="currentColor"/> : <Play size={24} fill="currentColor" className="ml-1"/>}
        </button>
      </div>
    </div>
  );
};