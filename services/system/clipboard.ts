export class ClipboardManager {
  async copy(t: string) { await navigator.clipboard.writeText(t); }
}