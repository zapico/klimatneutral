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

        this.macadam = 2.4 // 1.6 g co2 per kg 1500 kg per m3 -> 2.4kg per m3 (this seems low?)

        this.wood_panels = 133.14	//m3

        this.window_wood = 80; //Fake data
        this.window_alu = 80; //Fake data
        this.window_pvc = 80; //Fake data

        //Building parameters
        this.tomtyta = 1000;
        this.planyta = 500;
        this.gronyta = 0; //Percentage
        this.floors = 1;
        this.floor_height = 2.5; //m
        this.basement = 0;

        this.window_percentage = 10;

        this.frame_material = 0;
        this.frame_floor_material = 0;
        this.frame_roof_material = 0;
        this.frame_stairs_material = 0;

        this.foundation_material = 0;
        this.foundation_armering = 0;
        this.foundation_armering_percent = 0.05; //Standard
        this.foundation_iso = 0;
        this.foundation_thickness = 0.3; //Standard

        this.roof_angle = 0;
        this.roof_material = 0;

        this.isolation_material_ut = 0;
        this.isolation_material_in = 0;


        //Total impact
        this.foundation_co2 = 15;
        this.shell_co2 = 15;
        this.inside_co2 = 15;
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

      // 1. Calculate foundation
      // Basement?? Other types?
      var f1 = this.foundation_material*this.foundation_thickness*this.planyta; //Material
      var f2 = this.foundation_armering*this.foundation_armering_percent*this.planyta; //armering
      var f3 = this.foundation_iso*this.planyta*0.3; //isolering 30cm standard
      var f4 = this.macadam*this.foundation_armering_percent*this.planyta*0.3; //makadam 30cm
      this.foundation_co2 = f1+f2+f3+f4;
      this.foundation_co2 = Math.round(this.concrete_co2);


      // 2. Calculate frame
      // Calculate building measures
      var total_h = this.floors * this.floor_height;
      var side_lenght = square(this.planyta);
      var envelope = total_h*side_lenght*4;
      var window_area = envelope*(this.window_percentage/100);
      var envelope_factor = 0;
      var floor_factor = 0;
      var roof_factor = 0;
      var stairs_factor = 0;
      // Calculate roof size
      if (this.roof_angle == 0){
        var roof_area = this.planyta;
      }else{
        var roof_area = this.side_lenght * (this.side_lenght/cos(this.roof_angle)) * 2; //building lenght * rafter length calculated with angle * times two rafters
      };
      // Calculate frame
      var s1 = this.frame_material*envelope*envelope_factor;
      var s2 = this.frame_floor_material*this.planyta*this.floors*floor_factor;
      var s3 = this.frame_roof_material*roof_area*roof_factor;
      var s4 = this.frame_stairs_material*total_h*stair_factor;
      this.stomme_co2 = s1 + s2 + s3 + s4;
      this.stomme_co2 = Math.round(this.stomme_co2);

      // 3. Calculate weather shell
      // 3.1 Façade
      var w1 = this.facade_material*(envelope-window_area);
      // 3.2 Isolation
      var w2 = this.isolation_material_ut*this.planyta*this.isolation_thickness_ut*0.005 + this.isolation_material_in*this.planyta*this.isolation_thickness_in;
      // 3.3 Roof
      var w3 = this.roof_material*roof_area;
      // 3.4 Windows
      var w4 = this.window_material*window_area;
      //Sum up
      this.shell_co2 = w1 + w2 + w3 + w4;
      this.shell_co2 = Math.round(this.shell_co2);

      // 4. Calculate inside
      walls_area = ???; // How to calculate this
      // 4.1 Walls
      var i1 = this.walls_material*walls_area; //Fix
      // 4.2 Golv
      var i2 = this.flooring_material*this.planyta*this.floors;
      // 4.3 Isolering
      var i3 = this.isolation_material_in*walls_area*thickness_standard; // Fix
      // Sum up
      this.inside_co2 = i1 + i2 + i3;
      this.inside_co2 = Math.round(this.inside_co2);

      // 5. Add up everything

      this.total_co2 = this.concrete_co2 + this.shell_co2 + this.inside_co2 + this.stomme_co2;
      this.co2_m2 = Math.round(this.total_co2/(this.planyta*this.floors));
      if(this.co2_m2 == 0){this.co2_m2 =1;}

      //this.gyfactor = (((this.tomtyta-this.planyta)*this.gronyta/100)*0.4)/this.tomtyta;
      //this.gyfactor = Math.round(this.gyfactor * 100) / 100; //round to 2.

      for (let func of this.listeners) {
          func();
      }

    }
}
