import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Film } from 'lucide-react';
import { kernel } from '../services/kernel';

export const VideoPlayerApp: React.FC<{file?: string}> = ({ file }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (file && videoRef.current) kernel.fs.cat(file).then(src => { videoRef.current!.src = src; videoRef.current!.play(); setPlaying(true); });
  }, [file]);

  return (
    <div className="h-full bg-black flex flex-col justify-center relative">
      <video ref={videoRef} className="w-full h-full object-contain" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          <button onClick={() => { setPlaying(!playing); playing ? videoRef.current?.pause() : videoRef.current?.play(); }} className="text-white bg-red-600 p-3 rounded-full">
            {playing ? <Pause /> : <Play />}
          </button>
      </div>
    </div>
  );
};