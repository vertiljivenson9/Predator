import { VFS } from './vfs';
import { PersistentRegistry } from './registry/prefs';
// ... imports de servicios
export class Kernel {
  public fs = new VFS();
  public registry = new PersistentRegistry();
  // ... inicialización de 18 apps y servicios
  async boot() {
    // Lógica de montaje de IDB, OPFS y registro de Apps
  }
}
export const kernel = new Kernel();