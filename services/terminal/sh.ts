import { kernel } from '../kernel';
export class Shell {
  async exec(cmd: string, print: (s: string) => void, setCwd: (p: string) => void, getCwd: () => string) {
    const parts = cmd.split(' ');
    const c = parts[0];
    if (c === 'ls') { const f = await kernel.fs.ls(getCwd()); print(f.join('  ')); }
    else if (c === 'cd') { setCwd(parts[1]); }
    else if (c === 'cat') { const content = await kernel.fs.cat(parts[1]); print(content); }
    else print('Command not found: ' + c);
  }
}