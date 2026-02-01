export class PackageManager {
  isSystemApp(id: string) { return ['terminal', 'settings', 'files'].includes(id); }
  async installVPX(path: string) { console.log('Installing package from ' + path); }
  async uninstall(id: string) { console.log('Uninstalling ' + id); }
}