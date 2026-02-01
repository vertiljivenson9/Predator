import React, { useRef, useEffect, useState } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
export const CameraApp: React.FC = () => {
  const v = useRef<HTMLVideoElement>(null);
  const [err, setErr] = useState<string|null>(null);
  useEffect(() => { 
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => { if(v.current) v.current.srcObject = s; }).catch(e => setErr(e.message));
    return () => { const s = v.current?.srcObject as MediaStream; s?.getTracks().forEach(t => t.stop()); };
  }, []);
  return (
    <div className="h-full bg-black relative flex flex-col items-center justify-center text-white">
      {err ? <div className="text-center p-8"><Camera size={48} className="mx-auto mb-4 opacity-20"/><p className="text-xs uppercase font-black">{err}</p></div> : <video ref={v} autoPlay playsInline className="w-full h-full object-cover" />}
      <div className="absolute bottom-10 w-20 h-20 border-4 border-white rounded-full flex items-center justify-center active:scale-90 transition-all"><div className="w-16 h-16 bg-white rounded-full shadow-2xl" /></div>
    </div>
  );
};