export class OPFSBackend {
  private root: any;
  async mount() { this.root = await navigator.storage.getDirectory(); }
  async exists(path: string) { return false; }
  async ls(path: string) { return []; }
  async isLocked() { return false; }
}