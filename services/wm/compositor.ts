export class Compositor {
  private windows: Map<string, any> = new Map();
  registerWindow(win: any) { this.windows.set(win.id, win); }
  bringToFront(id: string) { /* logic */ }
}