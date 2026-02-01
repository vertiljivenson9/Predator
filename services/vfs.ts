import { IVFS, FileSystemBackend } from '../types';
export class VFS implements IVFS {
  private mounts: {path: string, backend: FileSystemBackend}[] = [];
  mount(path: string, backend: FileSystemBackend) {
    this.mounts = this.mounts.filter(m => m.path !== path);
    this.mounts.push({ path, backend });
    this.mounts.sort((a, b) => b.path.length - a.path.length);
  }
  private resolve(path: string) {
    const clean = path === '/' ? '/' : path.replace(/\/$/, '');
    for (const m of this.mounts) {
      const prefix = m.path === '/' ? '/' : m.path + '/';
      if (clean === m.path || clean.startsWith(prefix)) return { backend: m.backend, rel: clean };
    }
    return null;
  }
  async ls(path: string) {
    const r = this.resolve(path);
    if (!r) throw new Error('Unmounted');
    return r.backend.ls(r.rel);
  }
  async cat(path: string) {
    const r = this.resolve(path);
    if (!r) throw new Error('Unmounted');
    return r.backend.cat(r.rel);
  }
  async write(path: string, data: string) {
    const r = this.resolve(path);
    if (!r) throw new Error('Unmounted');
    await r.backend.write(r.rel, data);
  }
  async mkdir(path: string) {
    const r = this.resolve(path);
    if (!r) throw new Error('Unmounted');
    await r.backend.mkdir(r.rel);
  }
  async rm(path: string) {
    const r = this.resolve(path);
    if (!r) throw new Error('Unmounted');
    await r.backend.rm(r.rel);
  }
  async exists(path: string) {
    const r = this.resolve(path);
    return r ? r.backend.exists(r.rel) : false;
  }
}