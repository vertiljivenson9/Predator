import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
export const SettingsApp: React.FC = () => {
  const [br, setBr] = useState(100);
  const save = async (v: number) => {
    setBr(v);
    await kernel.registry.set('user.display.brightness', v);
    window.dispatchEvent(new CustomEvent('sys-config-update'));
  };
  return <div className="p-8 text-white bg-black h-full">
    <h1 className="text-xl font-bold mb-4 uppercase tracking-widest">Settings</h1>
    <label className="block text-xs text-gray-500 mb-2">BRIGHTNESS: {br}%</label>
    <input type="range" className="w-full" value={br} onChange={e => save(Number(e.target.value))} />
  </div>;
};