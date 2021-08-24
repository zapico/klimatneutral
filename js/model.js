class Model {

    constructor() {
        // Start variables
        // List of materials
        this.frame_prefab_concrete =	359.3	//m2
        this.frame_insitu_concrete =	359.3	//m2
        this.frame_light_timber =	69.80	//m2
        this.frame_CLT = 90.30 //	m2
        this.frame_steel =	60.00	//m2

        this.concrete_insitu =	256.15	//m3
        this.concrete_prefab =	218.62	//t (How is this being able to compare??)
        this.light_blocks =	151.49	//m3

        this.scrapbased_steel =	0.51	//kg
        this.orebased_steel =	1.04	//kg
        this.mixed_steel =	0.78	//kg

        this.cellplast	= 70.97	//m3
        this.cellulose	= 36.00	//m3
        this.rockwool	= 38.31	//m3
        this.glasswool	= 43.09	//m3

        this.light_timber	= 42.67	//m3
        this.CLT	= 90.33	//m3
        this.Glulam	= 69.80	//m3
        this.LVL =	70.97

        this.macadam = 2.4 // 1.6 g co2 per kg 1500 kg per m3 -> 2.4kg per m3 (this seems low?)

        this.facad_wood_panels = 2.5	// m2
        this.facad_puts = 2.50; //m2 FAKE
        this.fasad_mineralskiva = 2.50; //m2 FAKE
        this.fasad_tegel = 2.50; //m2 FAKE

        this.window_wood = 75.9;
        this.window_alu = 75.9; //Fake data
        this.window_pvc = 75.9; //Fake data

        this.wood_panels_inne = 1.33; //m2 Check data!
        this.gips_inne = 1.50; //m2 Fake data!
        this.betong_inne = 2.00; //m2 Fake data

        this.flooring_wood = 9; //m2 Fake data
        this.flooring_laminat = 10; //m2 Fake data
        this.flooring_plast = 10; //m2 Fake data

        this.roof_metal = 4.7; //m2 Fake data
        this.roof_tiles = 4.7; //m2 Fake data
        this.roof_concretetiles = 4.7; //m2 Fake data
        this.roof_sedum = 4.7; //m2 Fake data
        this.roof_takpapp = 4.7; //m2 Fake data

        //Building parameters
        this.tomtyta = 1000;
        this.planyta = 500;
        this.gronyta = 0; //Percentage
        this.floors = 1;
        this.floor_height = 2.5; //m
        this.basement = 0;

        this.window_percentage = 20; //Window to floor ratio

        this.frame_material = ""; //Text: Betong, CLT, Timber

        this.foundation_material = 0;
        this.foundation_armering = 0;
        this.foundation_armering_percent = 0.05; //Standard
        this.foundation_iso = 0;
        this.foundation_thickness = 0.3; //Standard

        this.roof_angle = 0;
        this.roof_material = 0;

        this.isolation_material_ut = 25;
        this.isolation_material_in = 20;

        this.facad_material_impact = 0;
        this.roof_material_impact = 0;
        this.insidewalls_impact = 0;
        this.insidefloor_impact = 0;

        //Total impact
        this.foundation_co2 = 1;
        this.shell_co2 = 1;
        this.inside_co2 = 1;
        this.stomme_co2 = 1;

        this.total_co2 = 0;
        this.co2_m2 = 20;

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

      // 1. Calculate foundation
      // Basement?? Other types?
      var f1 = this.foundation_material*this.foundation_thickness*this.planyta; //Material
      var f2 = this.foundation_armering*this.foundation_armering_percent*this.planyta; //armering
      var f3 = this.foundation_iso*this.planyta*0.3; //isolering 30cm standard
      var f4 = this.macadam*this.foundation_armering_percent*this.planyta*0.3; //makadam 30cm
      this.foundation_co2 = f1+f2+f3+f4;
      this.foundation_co2 = Math.round(this.foundation_co2);


      // 2. Calculate frame
      // Calculate building measures
      var total_h = this.floors * this.floor_height;
      var side_lenght = Math.sqrt(this.planyta);
      var envelope = total_h*side_lenght*4;
      var window_area = this.planyta*(this.window_percentage/100); //Doublecheck that it is not more than 100% of façade
      var envelope_factor = 1;
      var floor_factor = 1;
      var roof_factor = 1;
      var stairs_factor = 1.5; //1.5 m3 per floor
      var door_factor = 0.9; //How much of wall is not doors in percentage
      var roof_area = 1;
      var factor_walls = 2.2; // Ratio of interior walls to envelope
      var isolation_thickness_ut = 0.150;

      // Calculate roof size
      if (this.roof_angle == 0){
        this.roof_area = this.planyta;
      }else{
        this.roof_area = this.side_lenght * ((this.side_lenght/2)/cos(this.roof_angle)) * 2; //building lenght * rafter length calculated with angle * times two rafters
      };
      // Calculate frame
      // Do switch for materials
      switch(this.frame_material){
        case "Timber":
          var s1 = this.frame_light_timber*envelope*envelope_factor;
          var s2 = this.frame_light_timber*this.planyta*this.floors*0.3*0.3; //thickness 0.3m, a third of area is frame
        break;
        case "Betong":
          var s1 = this.frame_insitu_concrete*envelope*envelope_factor;
          var s2 = this.frame_insitu_concrete*this.planyta*this.floors*0.3*0.3; //thickness 0.3m, a third of area is frame
        break;
        case "CLT":
          var s1 = this.frame_CLT*envelope*envelope_factor;
          var s2 = this.frame_CLT*this.planyta*this.floors*0.3*0.3; //thickness 0.3m, a third of area is frame
        break;
    };
      // Calculate roof frame, always in timber
      if (this.roof_angle == 0){
        var s3 = this.frame_light_timber*this.planyta*0.3*0.34; // thickness 17cm*2 , a third of area is frame
      }else{
        var s3 = this.frame_light_timber*this.roof_area*10;//10m3 of truss material per sq meter area
      };
      // Calculate stairs, always in concrete
      var s4 = this.concrete_insitu*(this.floors-1)*1; // FIX FACTOR

      this.stomme_co2 = s1 + s2 + s3 + s4;
      this.stomme_co2 = Math.round(this.stomme_co2);
      console.log("Stomme: a.Walls "+s1 + " b.Floors: "+ s2 + " c.Roof: "+ s3 +" d.Stairs: "+ s4);
      console.log("Stomme total: " + Math.round(this.stomme_co2));

      // 3. Calculate weather shell
      // 3.1 Façade
      var w1 = this.facad_material_impact*(envelope-window_area);
      // 3.2 Isolation

      switch(this.frame_material){
        case "CLT":
          isolation_thickness_ut = 0.130; //frame_CLT, no cellplast
        case "Betong":
          isolation_thickness_ut = 0.150; // frame Betong, only cellplast
        break;
        case "Timber":
          isolation_thickness_ut = 0.162; // frame light_timber, no cellplast
        break;
        };
      //console.log("Isolation: "+this.isolation_material_ut+" "+envelope+" "+window_area+" "+isolation_thickness_ut)
      var w2 = this.isolation_material_ut*(envelope-window_area)*isolation_thickness_ut;
      w2 += this.isolation_material_ut*this.planyta*0.5;
      //console.log("Total isolation: "+w2);

      // 3.3 Roof
      //console.log("Roof: 1.Material impact: "+this.roof_material_impact+" 2.Area: "+roof_area)
      var w3 = this.roof_material_impact*roof_area;
      //console.log("Total roof: "+w3);
      // 3.4 Windows
      //console.log("Windows: 1.Material impact"+ this.window_material + " 2.window area:"+ window_area);
      var w4 = this.window_material*window_area;
      //console.log("Total window: "+w4);
      //Sum up
      this.shell_co2 = w1 + w2 + w3 + w4;
      this.shell_co2 = Math.round(this.shell_co2);

      // 4. Calculate inside
      var inside_walls_area = envelope*factor_walls; //
      // 4.1 Walls
      switch(this.frame_material){
        case "CLT":
            var i1 = this.insidewalls_impact*inside_walls_area + this.insidewalls_impact*(envelope-window_area); //Fix
        case "Betong":
          var i1 = this.insidewalls_impact*inside_walls_area; //Fix
        break;
        case "Timber":
            var i1 = this.insidewalls_impact*inside_walls_area + this.insidewalls_impact*(envelope-window_area); //Fix
        break;
        };
      i1 += this.isolation_material_ut*inside_walls_area*0.15;// isolation thickness = 150

      // 4.2 Golv
      var i2 = this.insidefloor_impact*this.planyta*this.floors;
      i2 += this.isolation_material_ut*this.planyta*this.floors*0.25; // isolation thickness= 250

      // Sum up
      console.log("Inside: a.Walls: " + i1 +" b.Isolation: " +i2)
      this.inside_co2 = i1 + i2;
      this.inside_co2 = Math.round(this.inside_co2);

      // 5. Add up everything
      this.total_co2 = this.foundation_co2 + this.shell_co2 + this.inside_co2 + this.stomme_co2;
      this.co2_m2 = Math.round(this.total_co2/(this.planyta*this.floors));
      if(this.co2_m2 == 0){this.co2_m2 =1;}

      for (let func of this.listeners) {
          func();
      }

    }
}
