export class AudioMixer {
  private ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  async init() { console.log('[Audio] Mixer Ready'); }
  setMasterVolume(v: number) { console.log('Vol:', v); }
}