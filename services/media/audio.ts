export class AudioMixer {
  private ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  async init() { console.log('[Audio] Mixer Ready'); }
  setMasterVolume(val: number) { console.log('Vol:', val); }
}