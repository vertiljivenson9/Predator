import { kernel } from '../kernel';
export class Shell {
  async exec(cmd: string, print: (s: string) => void, setCwd: (p: string) => void, getCwd: () => string) {
    const [name, ...args] = cmd.split(' ');
    if (name === 'ls') print((await kernel.fs.ls(getCwd())).join(' '));
    else if (name === 'cd') setCwd(args[0]);
    else if (name === 'cat') print(await kernel.fs.cat(args[0]));
    else print('Unknown command: ' + name);
  }
}