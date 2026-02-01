export class MachineIdentity {
  static getMachineId() { return 'SHARK-' + Math.random().toString(36).substr(2, 9).toUpperCase(); }
}