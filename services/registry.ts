import { IRegistry } from '../types';
const DB_NAME = 'WebOS_Registry';
const STORE_NAME = 'keys';
export class Registry implements IRegistry {
  private db: IDBDatabase | null = null;
  private async openDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return new Promise((res, rej) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = (e: any) => e.target.result.createObjectStore(STORE_NAME, { keyPath: 'key' });
      req.onsuccess = (e: any) => { this.db = e.target.result; res(this.db!); };
      req.onerror = rej;
    });
  }
  async get(k: string) { const db = await this.openDB(); return new Promise(res => { const tx = db.transaction(STORE_NAME, 'readonly'); const req = tx.objectStore(STORE_NAME).get(k); req.onsuccess = () => res(req.result?.value); req.onerror = () => res(undefined); }); }
  async set(k: string, v: any) { const db = await this.openDB(); return new Promise((res, rej) => { const tx = db.transaction(STORE_NAME, 'readwrite'); const req = tx.objectStore(STORE_NAME).put({ key: k, value: v }); req.onsuccess = () => res(); req.onerror = rej; }); }
  async delete(k: string) { const db = await this.openDB(); return new Promise(res => { const tx = db.transaction(STORE_NAME, 'readwrite'); tx.objectStore(STORE_NAME).delete(k).onsuccess = () => res(); }); }
  async list(p: string) { const db = await this.openDB(); return new Promise<string[]>(res => { const tx = db.transaction(STORE_NAME, 'readonly'); tx.objectStore(STORE_NAME).getAllKeys().onsuccess = (e:any) => res(e.target.result.filter((k:string) => k.startsWith(p))); }); }
}