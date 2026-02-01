export class GestureRecognizer {
  attach(el: HTMLElement) { el.addEventListener('touchstart', () => console.log('Gesture recognized')); }
}