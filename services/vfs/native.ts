export class NativeFSBackend {
  constructor(private h: any) {}
  async mount() {}
  async exists() { return false; }
  async ls() { return []; }
  async write() {}
  async mkdir() {}
  async rm() {}
}