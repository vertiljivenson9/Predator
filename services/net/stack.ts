export class NetworkStack {
  async request(url: string) {
    const res = await fetch(url);
    return res.text();
  }
}