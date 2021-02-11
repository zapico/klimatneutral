class Model {

    constructor() {
        // Start variables
        // List of materials
        this.concrete_insitu =	256.15	//m3
        this.concrete_prefab =	218.62	//t (How is this being able to compare??)
        this.light_blocks =	151.49	//m3

        this.scrapbased_steel =	0.51	//kg
        this.orebased_steel =	1.04	//kg
        this.mixed_steel =	0.78	//kg

        this.cellplast	= 70.97	//m3
        this.cellulose	= 36.00	//t
        this.rockwool	= 38.31	//m3
        this.glasswool	= 43.09	//m3

        this.light_timber	= 42.67	//m3
        this.CLT	= 90.33	//m3
        this.Glulam	= 69.80	//m3
        this.LVL =	70.97

        this.wood_panels = 133.14	//m3

        //Building parameters
        this.planyta = 500;
        this.foundation_material = 0;
        this.foundation_armering = 0;
        this.foundation_armering_percent = 0.05;
        this.foundation_thickness = 0;
        this.roof_angle = 30;

        //Total impact
        this.concrete_co2 = 100;
        this.isolation_co2 = 30;
        this.wood_co2 = 25;
        this.roof_co2 = 40;

        this.total_co2 = 0;
        this.co2_m2 = 0;

        //Circularity
        this.green = 0.2;
        this.yellow = 0.3;
        this.red = 0.5;

        // energy
        this.energy_m2 = 29; //kwh m2 år

        this.listeners = [];

        this.update();
    }

    addListener(func) {
        this.listeners.push(func);
    }

    update() {

      // Calculate foundation (Is this ok to calculate with planyta??)
      var f1 = this.foundation_material*this.foundation_thickness*this.planyta;
      var f2 = this.foundation_armering*this.foundation_armering_percent*this.planyta;
      //this.concrete_co2 = f1+f2;



      this.total_co2 = this.concrete_co2 + this.isolation_co2 + this.wood_co2 + this.roof_co2;
      this.co2_m2 = this.total_co2/this.planyta;
      console.log(this.total_co2);
      for (let func of this.listeners) {
          func();
      }

    }
}
