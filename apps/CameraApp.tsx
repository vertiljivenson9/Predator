import React, { useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
export const CameraApp = () => {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => { navigator.mediaDevices.getUserMedia({ video: true }).then(s => { if(v.current) v.current.srcObject = s; }); }, []);
  return <div className="h-full bg-black relative"><video ref={v} autoPlay className="w-full h-full object-cover" /><div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-white rounded-full flex items-center justify-center"><div className="w-12 h-12 bg-white rounded-full" /></div></div>;
};