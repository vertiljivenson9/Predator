import React, { useState, useEffect } from 'react';
import { kernel } from '../services/kernel';
export const SettingsApp: React.FC = () => {
  const save = async (key: string, val: any) => {
    await kernel.registry.set(key, val);
    window.dispatchEvent(new CustomEvent('sys-config-update'));
  };
  return (
    <div className="p-6 bg-black h-full text-white">
       <h2>Display Settings</h2>
       <input type="range" onChange={(e) => save('user.display.brightness', e.target.value)} />
    </div>
  );
};