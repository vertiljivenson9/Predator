import { kernel } from '../kernel';
export class PackageManager {
  async install(app: any) { await kernel.fs.write(`/system/apps/${app.id}.json`, JSON.stringify(app)); const inst = await kernel.registry.get('apps.installed') || []; if(!inst.includes(app.id)) await kernel.registry.set('apps.installed', [...inst, app.id]); }
  async uninstall(appId: string) { if(this.isSystemApp(appId)) return; await kernel.fs.rm(`/system/apps/${appId}.json`); const inst = await kernel.registry.get('apps.installed') || []; await kernel.registry.set('apps.installed', inst.filter((id:string) => id !== appId)); }
  isSystemApp(id: string) { return ['terminal', 'settings', 'files'].includes(id); }
}