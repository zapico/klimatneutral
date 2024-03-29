class Model {

    constructor() {
      return (async () => {
          const response = await fetch('https://api.boverket.se/klimatdatabas/get-all-resources/senaste/sv/json');
          const myJson = await response.json(); //extract JSON from the http response
          console.log(myJson);

          // List of materials
          //this.frame_prefab_concrete =	359.3	//m3
          //this.frame_insitu_concrete =	359.3	//m3
          //this.frame_light_timber =	69.80	//m3
          //this.frame_CLT = 90.30 //	m3
          //this.frame_steel =	60.00	//m3 Används inte

          //6000000192
          this.frame_light_timber_data = myJson.Resources.find(res => res.ResourceId === 6000000192);
          this.frame_light_timber	= parseFloat(this.frame_light_timber_data.DataItems[0].DataValueItems[1].Value) * 455;	//m3
          //6000000192
          this.light_timber_data = myJson.Resources.find(res => res.ResourceId === 6000000192);
          this.light_timber	= parseFloat(this.light_timber_data.DataItems[0].DataValueItems[1].Value) * 455;	//m3
          //6000000167
          this.frame_CLT_data = myJson.Resources.find(res => res.ResourceId === 6000000167);
          this.frame_CLT	= parseFloat(this.frame_CLT_data.DataItems[0].DataValueItems[1].Value) * parseFloat(this.frame_CLT_data.Conversions[0].Value);	//m3

          //6000000026
          this.concrete_insitu_data = myJson.Resources.find(res => res.ResourceId === 6000000026);
          this.concrete_insitu = parseFloat(this.concrete_insitu_data.DataItems[0].DataValueItems[0].Value) * 2350; //kg to m3

          //6000000027
          this.concrete_klimat_data = myJson.Resources.find(res => res.ResourceId === 6000000027);
          this.concrete_klimat = parseFloat(this.concrete_klimat_data.DataItems[0].DataValueItems[0].Value) * 2350; //kg to m3

          //6000000155
          this.scrapbased_steel_data = myJson.Resources.find(res => res.ResourceId === 6000000155);
          this.scrapbased_steel = parseFloat(this.scrapbased_steel_data.DataItems[0].DataValueItems[0].Value); //kg

          //6000000156
          this.mixed_steel_data = myJson.Resources.find(res => res.ResourceId === 6000000156);
          this.mixed_steel = parseFloat(this.mixed_steel_data.DataItems[0].DataValueItems[0].Value); //kg

          //Quite a big difference with Boverket!
          //this.scrapbased_steel =	0.51;	//kg
          //this.orebased_steel =	1.04;	//kg
          //this.mixed_steel =	0.78;	//kg

          this.frame_insitu_concrete = this.concrete_insitu + this.mixed_steel*80;
          this.frame_insitu_klimatconcrete = this.concrete_klimat + this.mixed_steel*80;

          //6000000131
          this.cellplast_data = myJson.Resources.find(res => res.ResourceId === 6000000131);
          this.cellplast	= parseFloat(this.cellplast_data.DataItems[0].DataValueItems[1].Value) * 16.0;	//m3
          //6000000136
          this.cellulose_data = myJson.Resources.find(res => res.ResourceId === 6000000136);
          this.cellulose	= parseFloat(this.cellulose_data.DataItems[0].DataValueItems[1].Value) * 50.0;	//m3
          //6000000123
          this.rockwool_data = myJson.Resources.find(res => res.ResourceId === 6000000123);
          this.rockwool	= parseFloat(this.rockwool_data.DataItems[0].DataValueItems[1].Value) * 29.0;	//m3
          //6000000004
          this.glasswool_data = myJson.Resources.find(res => res.ResourceId === 6000000004);
          this.glasswool	= parseFloat(this.glasswool_data.DataItems[0].DataValueItems[1].Value) * parseFloat(this.glasswool_data.Conversions[0].Value);	//m3

          //Ref to data? Not in boverket
          this.Glulam	= 69.80	//m3

          //6000000185
          this.LVL_data = myJson.Resources.find(res => res.ResourceId === 6000000185);
          this.LVL = parseFloat(this.LVL_data.DataItems[0].DataValueItems[0].Value) * 510;

          //Ref to data? Not in boverket
          this.macadam = 2.4 // 1.6 g co2 per kg 1500 kg per m3 -> 2.4kg per m3 (this seems low?)

          //6000000007
          this.facad_wood_panels_data = myJson.Resources.find(res => res.ResourceId === 6000000007);
          this.facad_wood_panels = parseFloat(this.facad_wood_panels_data.DataItems[0].DataValueItems[0].Value) * 455 * 0.022; //Räknad på 22mm

          //6000000091
          this.facad_puts_data = myJson.Resources.find(res => res.ResourceId === 6000000091);
          //6000000188
          this.facad_puts_data2 = myJson.Resources.find(res => res.ResourceId === 6000000188);
          this.facad_puts = parseFloat(this.facad_puts_data.DataItems[0].DataValueItems[0].Value) * 10; //Räknad på 10kg per m2
          this.facad_puts += parseFloat(this.facad_puts_data2.DataItems[0].DataValueItems[0].Value) * 525 * 0.012; //putsbärarskiva Räknad på 12mm

          //6000000026
          this.fasad_mineralskiva_data = myJson.Resources.find(res => res.ResourceId === 6000000182);
          this.fasad_mineralskiva = parseFloat(this.fasad_mineralskiva_data.DataItems[0].DataValueItems[0].Value) * 19.50; //Räknad på 10mm

          //6000000182
          this.fasad_mineralskiva_data = myJson.Resources.find(res => res.ResourceId === 6000000182);
          this.fasad_mineralskiva = parseFloat(this.fasad_mineralskiva_data.DataItems[0].DataValueItems[0].Value) * 19.50; //Räknad på 10mm

          //6000000082
          this.fasad_tegel_data = myJson.Resources.find(res => res.ResourceId === 6000000082);
          this.fasad_tegel = parseFloat(this.fasad_tegel_data.DataItems[0].DataValueItems[0].Value) * 1800*0.120; //Räknad på 120mm Bara tegel utan bruk!

          //6000000104
          this.window_wood_data = myJson.Resources.find(res => res.ResourceId === 6000000104);
          this.window_wood = parseFloat(this.window_wood_data.DataItems[0].DataValueItems[0].Value) * parseFloat(this.window_wood_data.Conversions[0].Value);

          //6000000192
          this.wood_panels_inne_data = myJson.Resources.find(res => res.ResourceId === 6000000192);
          this.wood_panels_inne = parseFloat(this.wood_panels_inne_data.DataItems[0].DataValueItems[0].Value) * 455 * 0.012; //Räknad på 12mm pärslpånt

          //6000000020
          this.gipsdata = myJson.Resources.find(res => res.ResourceId === 6000000020);
          this.gips_inne =  parseFloat(this.gipsdata.DataItems[0].DataValueItems[0].Value) * parseFloat(this.gipsdata.Conversions[0].Value) * 0.0125 ;	//m2 12.5mm

          // this.betong_inne = 2.00; //m2 Fake data

          //6000000192
          this.flooring_wood_data = myJson.Resources.find(res => res.ResourceId === 6000000192);
          this.flooring_wood	= parseFloat(this.flooring_wood_data.DataItems[0].DataValueItems[1].Value) * 455* 0.022;	//m2 på 22mm

          //No data
          this.flooring_laminat = 10; //m2 Fake data
          //No data
          this.flooring_plast = 10; //m2 Fake data

          //6000000153
          this.roof_metal_data = myJson.Resources.find(res => res.ResourceId === 6000000153);
          this.roof_metal = parseFloat(this.roof_metal_data.DataItems[0].DataValueItems[0].Value) * 5 //m2 5 kg per kvm
          //6000000081
          this.roof_tiles_data = myJson.Resources.find(res => res.ResourceId === 6000000081);
          this.roof_tiles = parseFloat(this.roof_tiles_data.DataItems[0].DataValueItems[0].Value) * 33; //m2 0,215kg co2 per kg, 33 kg per kvm
          //6000000079
          this.roof_concretetiles_data = myJson.Resources.find(res => res.ResourceId === 6000000079);
          this.roof_concretetiles =  parseFloat(this.roof_concretetiles_data.DataItems[0].DataValueItems[0].Value) * 45;	//m2 45 kg per kvm
          //No data
          this.roof_sedum = 4.7; //m2 Fake data
          //6000000142
          this.roof_takpapp_data = myJson.Resources.find(res => res.ResourceId === 6000000142);
          this.roof_takpapp =  parseFloat(this.roof_takpapp_data.DataItems[0].DataValueItems[0].Value) * 4;	//m2 4 kg per kvm
          //6000000140
          this.roof_membrane_data = myJson.Resources.find(res => res.ResourceId === 6000000140);
          this.roof_membrane =  parseFloat(this.roof_membrane_data.DataItems[0].DataValueItems[0].Value) * 4;	//m2 4 kg per kvm

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

        this.roof_angle = 30;
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
        return this;
      })();
    }

    addListener(func) {
        this.listeners.push(func);
    }

    update() {

      // 1. Calculate foundation
      // Basement?? Other types?
      var f1 = this.foundation_material*this.foundation_thickness*this.planyta; //Material
      var f2 = this.scrapbased_steel*this.foundation_thickness*this.planyta*80; //armering 80kg per m3 betong
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
        var roof_area = this.planyta;
      }else{

        var angle_rad = this.roof_angle*(3.1416/180);
        var roof_area = side_lenght * ((side_lenght/2)/Math.cos(angle_rad)) * 2; //building lenght * rafter length calculated with angle * times two rafters
      };
      // Calculate frame
      // Do switch for materials
      switch(this.frame_material){
        case "Timber":
          var s1 = this.frame_light_timber*envelope*0.3*0.3;
          var s2 = this.frame_light_timber*this.planyta*this.floors*0.3*0.3; //thickness 0.3m, a third of area is frame
        break;
        case "Betong":
          var s1 = this.frame_insitu_concrete*envelope*0.3*0.3;
          var s2 = this.frame_insitu_concrete*this.planyta*this.floors*0.3*0.3; //thickness 0.3m, a third of area is frame
        break;
        case "Klimatbetong":
          var s1 = this.frame_insitu_klimatconcrete*envelope*0.3*0.3;
          var s2 = this.frame_insitu_klimatconcrete*this.planyta*this.floors*0.3*0.3; //thickness 0.3m, a third of area is frame
        break;
        case "CLT":
          var s1 = this.frame_CLT*envelope*0.3*0.3;
          var s2 = this.frame_CLT*this.planyta*this.floors*0.3*0.3; //thickness 0.3m, a third of area is frame
        break;
    };
      // Calculate roof frame, always in timber
      if (this.roof_angle == 0){
        var s3 = this.frame_light_timber*this.planyta*0.3*0.34; // thickness 17cm*2 , a third of area is frame
      }else{
        var s3 = this.frame_light_timber*this.planyta*0.3*0.34; // under
        s3 += this.frame_light_timber*roof_area*0.3*0.34 + this.frame_light_timber*this.planyta*0.3*0.34; //trusses

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
        case "Klimatbetong":
          isolation_thickness_ut = 0.150; // frame Betong, only cellplast
        break;
        case "Timber":
          isolation_thickness_ut = 0.162; // frame light_timber, no cellplast
        break;
        };
      //console.log("Isolation: "+this.isolation_matedrial_ut+" "+envelope+" "+window_area+" "+isolation_thickness_ut)
      var w2 = this.isolation_material_ut*(envelope-window_area)*isolation_thickness_ut;
      w2 += this.isolation_material_ut*this.planyta*0.5;
      //console.log("Total isolation: "+w2);

      // 3.3 Roof
      //console.log("Roof: 1.Material impact: "+this.roof_material_impact+" 2.Area: "+roof_area)
      var w3 = this.roof_material_impact*roof_area;
      w3 += this.roof_membrane*roof_area;
      //console.log("Total roof: "+w3);
      // 3.4 Windows
      //console.log("Windows: 1.Material impact"+ this.window_material + " 2.window area:"+ window_area);
      var w4 = this.window_wood*window_area;
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
        case "Klimatbetong":
          var i1 = this.insidewalls_impact*inside_walls_area; //Fix
        break;
        case "Timber":
            var i1 = this.insidewalls_impact*inside_walls_area + this.insidewalls_impact*(envelope-window_area); //Fix
        break;
        };
      i1 += this.isolation_material_ut*inside_walls_area*0.15;// isolation thickness = 150

      // 4.2 Golv
      //var i2 = this.insidefloor_impact*this.planyta*this.floors;
      var i2 = this.isolation_material_ut*this.planyta*this.floors*0.25; // isolation thickness= 250

      // Sum up
      console.log("Inside: a.Walls: " + i1 +" b.Isolation: " +i2)
      this.inside_co2 = i1 + i2;
      this.inside_co2 = Math.round(this.inside_co2);

      // 5. Add up everything
      this.total_co2 = this.foundation_co2 + this.shell_co2 + this.inside_co2 + this.stomme_co2;
      this.co2_m2 = Math.round(this.total_co2/(this.planyta*this.floors));
      if(this.co2_m2 == 0){this.co2_m2 =1;}

      console.log(this.floors);

     for (let func of this.listeners) {func();}
    }
}
