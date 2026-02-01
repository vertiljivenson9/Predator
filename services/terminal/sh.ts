import { kernel } from '../kernel';
export class Shell {
  async exec(cmd: string, print: (s:string)=>void, setCwd: (p:string)=>void, getCwd: ()=>string) {
    const [name, ...args] = cmd.split(' ');
    if(name === 'ls') print((await kernel.fs.ls(getCwd())).join('  '));
    else if(name === 'cd') { const p = args[0] === '..' ? getCwd().split('/').slice(0,-1).join('/') || '/' : args[0]; if(await kernel.fs.exists(p)) setCwd(p); else print('Directorio no encontrado'); }
    else if(name === 'cat') print(await kernel.fs.cat(args[0]));
    else if(name === 'mkdir') await kernel.fs.mkdir(getCwd() === '/' ? '/'+args[0] : getCwd()+'/'+args[0]);
    else if(name === 'clear') print('\u001b[2J');
    else print('Comando no reconocido: ' + name);
  }
}