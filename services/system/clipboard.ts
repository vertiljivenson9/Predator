export class ClipboardManager {
  async copy(text: string) { await navigator.clipboard.writeText(text); }
  async paste() { return await navigator.clipboard.readText(); }
}