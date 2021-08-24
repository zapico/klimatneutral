class Model {

    constructor() {
      //Grön Yte factor
      this.gyfactor = 0;
      this.tomtyta = 1000;
      this.planyta = 0;
      this.gronyta = 0;
      this.tradyta = 0;
      this.hardyta = 0;
      this.listeners = [];

      this.update();
    }

    addListener(func) {
      this.listeners.push(func);
    }

    update() {
      var built =  Math.round(this.tomtyta*this.planyta/100);
      this.gyfactor = (((this.tomtyta-built)*this.gronyta/100)*0.4)/this.tomtyta;
      this.gyfactor = Math.round(this.gyfactor * 100) / 100; //round to 2.

      for (let func of this.listeners) {
          func();
      }
    }

}
