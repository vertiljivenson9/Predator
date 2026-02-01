import { kernel } from '../kernel';
export class PackageManager {
  async install(appId: string) { console.log(`Installing ${appId}`); }
  async uninstall(appId: string) { console.log(`Removing ${appId}`); }
  isSystemApp(id: string) { return ['terminal', 'settings', 'files'].includes(id); }
}