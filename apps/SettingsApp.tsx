import React, { useState } from 'react';
import { kernel } from '../services/kernel';
export const SettingsApp = () => {
  const [pin, setPin] = useState('');
  const save = () => kernel.registry.set('system.security.pin', pin).then(() => alert('SYNC_OK'));
  return <div className="p-10 text-white"><h2>Seguridad Núcleo</h2><input type="password" value={pin} onChange={e => setPin(e.target.value)} /><button onClick={save}>Guardar</button></div>;
};