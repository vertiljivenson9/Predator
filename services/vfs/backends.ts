import { FileType } from '../../types';
export class IDBBackend {
    constructor(dbName, storeName = 'files') { this.dbName = dbName; this.storeName = storeName; }
    async mount() {
        return new Promise((resolve) => {
            const req = indexedDB.open(this.dbName, 1);
            req.onupgradeneeded = (e) => { e.target.result.createObjectStore(this.storeName, { keyPath: 'path' }); };
            req.onsuccess = (e) => { this.db = e.target.result; resolve(); };
        });
    }
    async ls(path) {
        return new Promise((resolve) => {
            const tx = this.db.transaction(this.storeName, 'readonly');
            const req = tx.objectStore(this.storeName).getAll();
            req.onsuccess = () => {
                const search = path === '/' ? '' : path;
                resolve(req.result.filter(f => f.path.startsWith(search) && f.path !== path).map(f => f.name + (f.type === 'DIR' ? '/' : '')));
            };
        });
    }
    async cat(path) {
        return new Promise((resolve) => {
            const tx = this.db.transaction(this.storeName, 'readonly');
            const req = tx.objectStore(this.storeName).get(path);
            req.onsuccess = () => resolve(req.result?.content || '');
        });
    }
    async write(path, content) {
        const tx = this.db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put({ path, name: path.split('/').pop(), type: 'FILE', content });
    }
    async mkdir(path) {
        const tx = this.db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put({ path, name: path.split('/').pop(), type: 'DIR', content: null });
    }
    async exists(path) {
        return new Promise((resolve) => {
            const tx = this.db.transaction(this.storeName, 'readonly');
            const req = tx.objectStore(this.storeName).get(path);
            req.onsuccess = () => resolve(!!req.result);
        });
    }
}
export class MemoryBackend {
    constructor() { this.files = new Map(); }
    async ls(path) { return Array.from(this.files.keys()).filter(p => p.startsWith(path)).map(p => p.replace(path, '')); }
    async cat(path) { return this.files.get(path) || ''; }
    async write(path, content) { this.files.set(path, content); }
    async mkdir(path) { this.files.set(path, null); }
    async exists(path) { return this.files.has(path); }
}