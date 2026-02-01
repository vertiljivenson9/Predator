import { FileType } from '../../types';
export class IDBBackend {
  constructor(private dbName: string, private storeName: string) {}
  db: IDBDatabase | null = null;
  async mount() { return new Promise<void>(res => { const req = indexedDB.open(this.dbName, 1); req.onupgradeneeded = (e:any) => e.target.result.createObjectStore(this.storeName, { keyPath: 'path' }); req.onsuccess = (e:any) => { this.db = e.target.result; res(); }; }); }
  async ls(path: string) { const tx = this.db!.transaction(this.storeName, 'readonly'); return new Promise<string[]>(res => { tx.objectStore(this.storeName).getAll().onsuccess = (e:any) => { const search = path === '/' ? '' : path; res(e.target.result.filter((f:any) => { const p = f.path.substring(0, f.path.lastIndexOf('/')); return (path === '/' ? p === '' : p === search); }).map((f:any) => f.name + (f.type === FileType.DIR ? '/' : ''))); }; }); }
  async cat(path: string) { const tx = this.db!.transaction(this.storeName, 'readonly'); return new Promise<string>(res => { tx.objectStore(this.storeName).get(path).onsuccess = (e:any) => res(e.target.result?.content || ''); }); }
  async write(path: string, content: string) { const tx = this.db!.transaction(this.storeName, 'readwrite'); tx.objectStore(this.storeName).put({ path, name: path.split('/').pop(), type: FileType.FILE, content }); }
  async mkdir(path: string) { const tx = this.db!.transaction(this.storeName, 'readwrite'); tx.objectStore(this.storeName).put({ path, name: path.split('/').pop(), type: FileType.DIR, content: null }); }
  async rm(path: string) { const tx = this.db!.transaction(this.storeName, 'readwrite'); tx.objectStore(this.storeName).delete(path); }
  async exists(path: string) { const tx = this.db!.transaction(this.storeName, 'readonly'); return new Promise<boolean>(res => { tx.objectStore(this.storeName).get(path).onsuccess = (e:any) => res(!!e.target.result); }); }
}
export class MemoryBackend {
  files = new Map<string, any>();
  async mount() {}
  async ls(path: string) { const search = path === '/' ? '' : path; return Array.from(this.files.keys()).filter(p => p.startsWith(search) && p !== path).map(p => p.replace(search+'/', '')); }
  async cat(path: string) { return this.files.get(path)?.content || ''; }
  async write(path: string, content: string) { this.files.set(path, { name: path.split('/').pop(), type: FileType.FILE, content }); }
  async mkdir(path: string) { this.files.set(path, { name: path.split('/').pop(), type: FileType.DIR }); }
  async rm(path: string) { this.files.delete(path); }
  async exists(path: string) { return this.files.has(path); }
}