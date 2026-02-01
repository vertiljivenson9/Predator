export class VoiceControl {
  private r: any;
  subscribe(cb: any) { return () => {}; }
  toggle() { console.log('Mic Toggled'); }
}