import { FileNode, FileType } from '../../types';
export class IDBBackend {
  constructor(private dbName: string, private storeName: string) {}
  db: IDBDatabase | null = null;
  async mount() {
    return new Promise<void>((res) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = (e: any) => e.target.result.createObjectStore(this.storeName, { keyPath: 'path' });
      req.onsuccess = (e: any) => { this.db = e.target.result; res(); };
    });
  }
  async ls(path: string) {
    return new Promise<string[]>((res) => {
      const tx = this.db!.transaction(this.storeName, 'readonly');
      const req = tx.objectStore(this.storeName).getAll();
      req.onsuccess = () => {
        const search = path === '/' ? '' : path;
        res(req.result.filter((f: any) => f.path.startsWith(search) && f.path !== path).map((f: any) => f.name + (f.type === 'DIR' ? '/' : '')));
      };
    });
  }
  async cat(path: string) {
    return new Promise<string>((res) => {
      const tx = this.db!.transaction(this.storeName, 'readonly');
      const req = tx.objectStore(this.storeName).get(path);
      req.onsuccess = () => res(req.result?.content || '');
    });
  }
  async write(path: string, content: string) {
    const tx = this.db!.transaction(this.storeName, 'readwrite');
    tx.objectStore(this.storeName).put({ path, name: path.split('/').pop(), type: 'FILE', content });
  }
  async mkdir(path: string) {
    const tx = this.db!.transaction(this.storeName, 'readwrite');
    tx.objectStore(this.storeName).put({ path, name: path.split('/').pop(), type: 'DIR', content: null });
  }
  async exists(path: string) {
    return new Promise<boolean>((res) => {
      const tx = this.db!.transaction(this.storeName, 'readonly');
      const req = tx.objectStore(this.storeName).get(path);
      req.onsuccess = () => res(!!req.result);
    });
  }
}
export class MemoryBackend {
  files = new Map<string, string>();
  async ls(path: string) { return Array.from(this.files.keys()).filter(p => p.startsWith(path)).map(p => p.replace(path, '')); }
  async cat(path: string) { return this.files.get(path) || ''; }
  async write(path: string, content: string) { this.files.set(path, content); }
  async mkdir(path: string) { this.files.set(path, ''); }
  async exists(path: string) { return this.files.has(path); }
}