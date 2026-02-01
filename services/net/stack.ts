import { kernel } from '../kernel';
export class NetworkStack {
  async request(url: string) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Network fail');
    return resp.text();
  }
}