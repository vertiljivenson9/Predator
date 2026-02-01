export class MachineIdentity {
  static getMachineId(): string {
    const key = 'system.machine.id';
    let id = localStorage.getItem(key);
    if (!id) { id = `mach-${crypto.randomUUID().split('-')[0]}`; localStorage.setItem(key, id); }
    return id;
  }
}