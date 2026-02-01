import { kernel } from '../kernel';
export class PowerManager {
  async init() { console.log('[Power] Initialized'); }
  async powerOff() { document.body.innerHTML = '<div style="background:black;height:100vh;display:flex;align-items:center;justify-content:center;color:#333;font-family:mono;">System Halted.</div>'; }
}