import { IRegistry } from '../types';
const DB_NAME = 'Shark_Registry';
const STORE = 'keys';
export class Registry implements IRegistry {
  private db: IDBDatabase | null = null;
  private async open() {
    if (this.db) return this.db;
    return new Promise<IDBDatabase>((res, rej) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'key' });
      req.onsuccess = () => { this.db = req.result; res(this.db); };
      req.onerror = () => rej(req.error);
    });
  }
  async get(key: string) {
    const db = await this.open();
    return new Promise(res => {
      const req = db.transaction(STORE).objectStore(STORE).get(key);
      req.onsuccess = () => res(req.result?.value);
    });
  }
  async set(key: string, value: any) {
    const db = await this.open();
    return new Promise<void>((res, rej) => {
      const req = db.transaction(STORE, 'readwrite').objectStore(STORE).put({ key, value });
      req.onsuccess = () => res(); req.onerror = () => rej();
    });
  }
  async delete(key: string) {
    const db = await this.open();
    await db.transaction(STORE, 'readwrite').objectStore(STORE).delete(key);
  }
  async list(prefix: string) {
    const db = await this.open();
    return new Promise<string[]>(res => {
      const req = db.transaction(STORE).objectStore(STORE).getAllKeys();
      req.onsuccess = () => res((req.result as string[]).filter(k => k.startsWith(prefix)));
    });
  }
}