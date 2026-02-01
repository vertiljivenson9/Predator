import React, { useEffect, useState } from 'react';
export const BiosScreen = ({ onComplete }: any) => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const l = [
      "AMIBIOS (C) 2025 American Megatrends",
      "Shark OS Apex Workstation v15.13",
      "CPU: WebAssembly Virtual Core @ 4.0GHz",
      "Memory: 4096MB Virtual DRAM ... OK",
      "Disk: SharkFS Primary Master ... OK",
      "Network: VPC Interface ... Connected",
      "Booting Apex Kernel..."
    ];
    l.forEach((text, i) => setTimeout(() => setLines(p => [...p, text]), i * 350));
    setTimeout(onComplete, 3500);
  }, []);
  return (
    <div className="fixed inset-0 z-[10000] bg-black text-[#a8a8a8] font-mono p-12 text-sm leading-loose uppercase select-none cursor-none">
      {lines.map((line, i) => <div key={i}>{line}</div>)}
      <div className="mt-12 text-[10px] opacity-20">Presiona DEL para configuración del BIOS</div>
    </div>
  );
};