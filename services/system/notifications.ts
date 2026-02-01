export class NotificationManager {
  push(t: string, m: string) { console.log('NOTIFY: ' + t + ' - ' + m); }
  subscribe(cb: any) { return () => {}; }
}