export class Observer {
    constructor() {
      this.observers = [];
    }
  
    subscribe(fn) {
      this.observers.push(fn);
    }
  
    unsubscribe(fn) {
      this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }
  
    notifica(dados) {
      this.observers.forEach(observer => observer(dados));
    }
}