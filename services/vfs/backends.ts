import { FileSystemBackend, FileType } from '../../types';
export class IDBBackend implements FileSystemBackend {
  private db: IDBDatabase | null = null;
  constructor(private name: string, private store: string) {}
  async mount() {
    return new Promise<void>((res) => {
      const req = indexedDB.open(this.name, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(this.store, { keyPath: 'path' });
      req.onsuccess = () => { this.db = req.result; res(); };
    });
  }
  async exists(path: string) {
    const tx = this.db!.transaction(this.store);
    return new Promise<boolean>(res => { tx.objectStore(this.store).get(path).onsuccess = (e: any) => res(!!e.target.result); });
  }
  async ls(path: string) {
    const tx = this.db!.transaction(this.store);
    return new Promise<string[]>(res => {
      tx.objectStore(this.store).getAll().onsuccess = (e: any) => {
        const all = e.target.result;
        res(all.filter((f: any) => f.path.startsWith(path) && f.path !== path).map((f: any) => f.path.split('/').pop()));
      };
    });
  }
  async cat(path: string) {
    const tx = this.db!.transaction(this.store);
    return new Promise<string>(res => { tx.objectStore(this.store).get(path).onsuccess = (e: any) => res(e.target.result?.content || ''); });
  }
  async write(path: string, content: string) {
    const tx = this.db!.transaction(this.store, 'readwrite');
    tx.objectStore(this.store).put({ path, content, type: FileType.FILE });
  }
  async mkdir(path: string) {
    const tx = this.db!.transaction(this.store, 'readwrite');
    tx.objectStore(this.store).put({ path, type: FileType.DIR });
  }
  async rm(path: string) {
    const tx = this.db!.transaction(this.store, 'readwrite');
    tx.objectStore(this.store).delete(path);
  }
}
export class MemoryBackend implements FileSystemBackend {
  private files = new Map<string, string>();
  async mount() {}
  async exists(p: string) { return this.files.has(p); }
  async ls(p: string) { return Array.from(this.files.keys()).filter(k => k.startsWith(p)).map(k => k.replace(p, '')); }
  async cat(p: string) { return this.files.get(p) || ''; }
  async write(p: string, c: string) { this.files.set(p, c); }
  async mkdir(p: string) {}
  async rm(p: string) { this.files.delete(p); }
}