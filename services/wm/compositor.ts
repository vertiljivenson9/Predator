export class Compositor {
  private windows = new Map();
  registerWindow(w: any) { this.windows.set(w.id, w); }
  unregisterWindow(id: string) { this.windows.delete(id); }
}