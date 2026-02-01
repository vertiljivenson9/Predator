import { IRegistry } from '../../types';
export class PersistentRegistry implements IRegistry {
  private cache = new Map<string, any>();
  private key = 'shark_prefs';
  constructor() {
    const raw = localStorage.getItem(this.key);
    if (raw) { const d = JSON.parse(raw); Object.keys(d).forEach(k => this.cache.set(k, d[k])); }
  }
  async get(k: string) { return this.cache.get(k); }
  async set(k: string, v: any) { this.cache.set(k, v); this.flush(); }
  async delete(k: string) { this.cache.delete(k); this.flush(); }
  async list(p: string) { return Array.from(this.cache.keys()).filter(k => k.startsWith(p)); }
  async flush() { localStorage.setItem(this.key, JSON.stringify(Object.fromEntries(this.cache))); }
}