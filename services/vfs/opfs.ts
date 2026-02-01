export class OPFSBackend {
  private root: any;
  async mount() { if(!navigator.storage?.getDirectory) return; this.root = await navigator.storage.getDirectory(); }
  async exists(path: string) { return false; }
  async ls(path: string) { return []; }
  async write(path: string, data: string) {}
  async mkdir(path: string) {}
  async rm(path: string) {}
  async isLocked() { return false; }
}