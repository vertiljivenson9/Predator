import { IVFS, FileSystemBackend, FileType } from '../types';
export class VFS implements IVFS {
  private mounts: any[] = [];
  mount(path: string, backend: FileSystemBackend): void {
    this.mounts = this.mounts.filter(m => m.path !== path);
    this.mounts.push({ path, backend });
    this.mounts.sort((a, b) => b.path.length - a.path.length);
  }
  private resolve(path: string) {
    const cleanPath = path === '/' ? '/' : path.replace(/\/$/, '');
    for (const m of this.mounts) {
      const matchPrefix = m.path === '/' ? '/' : `${m.path}/`;
      if (cleanPath === m.path || cleanPath.startsWith(matchPrefix)) return { backend: m.backend, relativePath: cleanPath };
    }
    return null;
  }
  async ls(path: string) {
    const r = this.resolve(path);
    if (!r) throw new Error(`VFS Error: No mount at ${path}`);
    const results = await r.backend.ls(r.relativePath);
    this.mounts.forEach(m => {
        if (m.path === '/') return;
        const lastSlash = m.path.lastIndexOf('/');
        const parent = m.path.substring(0, lastSlash === 0 ? 1 : lastSlash) || '/';
        if (parent === (path === '/' ? '/' : path.replace(/\/$/, ''))) {
            const name = m.path.substring(m.path.lastIndexOf('/') + 1) + '/';
            if (!results.includes(name)) results.push(name);
        }
    });
    return results;
  }
  async cat(path: string) { const r = this.resolve(path); return r ? r.backend.cat(r.relativePath) : ''; }
  async write(path: string, data: string) { const r = this.resolve(path); if (r) await r.backend.write(r.relativePath, data); }
  async mkdir(path: string) { const r = this.resolve(path); if (r) await r.backend.mkdir(r.relativePath); }
  async rm(path: string) { const r = this.resolve(path); if (r) await r.backend.rm(r.relativePath); }
  async exists(path: string) { 
    const clean = path === '/' ? '/' : path.replace(/\/$/, '');
    if (this.mounts.some(m => m.path === clean)) return true;
    const r = this.resolve(path);
    return r ? r.backend.exists(r.relativePath) : false;
  }
}