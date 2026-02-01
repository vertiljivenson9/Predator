import { kernel } from '../kernel';
export class NetworkStack {
  async request(url: string, opts: any = {}) {
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error(`Network Error ${res.status}`);
    return await res.text();
  }
}