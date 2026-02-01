import React, { useEffect, useState } from 'react';
export const BiosScreen = ({ onComplete }: any) => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const l = ["AMIBIOS (C) 2025 American Megatrends", "Shark OS Mobile Bios v4.0", "CPU: Virtual WASM Core @ 4.0GHz", "Memory: 4096MB OK", "Detecting System Drives... OK", "Booting Apex Kernel..."];
    l.forEach((text, i) => setTimeout(() => setLines(p => [...p, text]), i * 400));
    setTimeout(onComplete, 3000);
  }, []);
  return (
    <div className="fixed inset-0 z-[10000] bg-black text-gray-400 font-mono p-12 text-sm leading-relaxed">
      {lines.map((line, i) => <div key={i}>{line}</div>)}
    </div>
  );
};