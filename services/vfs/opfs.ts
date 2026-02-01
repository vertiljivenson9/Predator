export class OPFSBackend {
  async mount() { console.log('Vault Mounted'); }
  async isLocked() { return false; }
  async ls() { return []; }
  async exists() { return false; }
}