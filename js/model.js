class Model {

    constructor() {
        // Start variables
        // List of materials
        this.frame_prefab_concrete =	50.00	//m2
        this.frame_insitu_concrete =	40.00	//m2
        this.frame_light_timber =	30.00	//m2
        this.frame_CLT = 35.00 //	m2
        this.frame_steel =	60.00	//m2


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

        this.window_wood = 80; //Fake data
        this.window_alu = 80; //Fake data
        this.window_pvc = 80; //Fake data

        //Building parameters
        this.tomtyta = 1000;
        this.planyta = 500;
        this.gronyta = 0; //Percentage
        this.floors = 1;
        this.floor_height = 2.4; //m
        this.basement = 0;

        this.window_percentage = 10;

        this.frame_material = 0;
        this.frame_floor_material = 0;
        this.frame_roof_material = 0;
        this.frame_stairs_material = 0;
        this.foundation_material = 0;
        this.foundation_armering = 0;
        this.foundation_armering_percent = 0.05;
        this.foundation_thickness = 0;
        this.roof_angle = 30;
        this.isolation_material_ut = 0;
        this.isolation_thickness_ut = 40; //cm
        this.isolation_material_in = 0;
        this.isolation_thickness_in = 0.3; // m

        //Total impact
        this.concrete_co2 = 15;
        this.isolation_co2 = 15;
        this.wood_co2 = 15;
        this.stomme_co2 = 15;

        this.total_co2 = 0;
        this.co2_m2 = 20;

        //Circularity
        this.green = 0.2;
        this.yellow = 0.3;
        this.red = 0.5;

        // energy
        this.energy_m2 = 29; //kwh m2 år

        //Grön Yte factor
        this.gyfactor = 0;

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
      this.concrete_co2 = f1+f2;
      this.concrete_co2 = Math.round(this.concrete_co2);

      var total_h = this.floors * this.floor_height;

      // Calculate frame provisional
      var s1 = this.frame_material*this.planyta*total_h*0.6;
      var s2 = this.frame_floor_material*this.planyta*this.floors*0.6;
      var s3 = this.frame_roof_material*this.planyta*1.2;
      var s4 = this.frame_stairs_material*this.planyta*total_h*0.6;
      this.stomme_co2 = s1 + s2 + s3 + s4;
      this.stomme_co2 = Math.round(this.stomme_co2);
      console.log(this.stomme_co2);

      this.isolation_co2 = this.isolation_material_ut*this.planyta*this.isolation_thickness_ut*0.005 + this.isolation_material_in*this.planyta*this.isolation_thickness_in;
      this.isolation_co2 = Math.round(this.isolation_co2);

      this.wood_co2 = 15;

      this.total_co2 = this.concrete_co2 + this.isolation_co2 + this.wood_co2 + this.stomme_co2;
      this.co2_m2 = Math.round(this.total_co2/(this.planyta*this.floors));
      if(this.co2_m2 == 0){this.co2_m2 =1;}

      this.gyfactor = (((this.tomtyta-this.planyta)*this.gronyta/100)*0.4)/this.tomtyta;
      this.gyfactor = Math.round(this.gyfactor * 100) / 100; //round to 2.

      for (let func of this.listeners) {
          func();
      }

    }
}
