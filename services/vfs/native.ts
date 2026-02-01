export class NativeFSBackend {
  constructor(private handle: any) {}
  async mount() {}
  async ls() { return []; }
  async exists() { return false; }
}