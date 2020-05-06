// TODO Maybe we could load the starting values from a JSON file.
// TODO Break the model into sub-objects. E.g. this.personal.fossil, this.personal.electricty, ...
// TODO Standardize the nomenclature: electricity/el/electric, ...
// TODO Check the input of update_percentage() to avoid errors
// TODO We could hide the properties behind a closure and only make some of them available for external modification. Something like a React component's state.


class Model {

    constructor() {
        // Start variables

        // Population at the moment does not affect things but it should.
        this.population = 92567;
        this.start = 173476;

        // 1. Energy mix (This connects to sliders)

        this.personal_fossil = 0.4;
        this.personal_electric = 0.1;
        this.personal_bio = 0.5;

        this.trucks_fossil = 0.9;
        this.trucks_bio = 0.1;
        this.trucks_hydro = 0;

        this.bus_bio = 0.7;
        this.bus_el = 0.15;
        this.bus_fossil = 0.15;

        // 2. Amount driving (change later to real data) in km. This connects to sliders too

        // Per week
        this.total_short_trips = 50;
        this.percentage_bike_s = 0.2;
        this.percentage_bus_s = 0.2;

        this.total_medium_trips = 100;
        this.percentage_bike_m = 0.05;
        this.percentage_bus_m = 0.1;

        this.total_long_trips = 150;
        this.percentage_bus_l = 0.1;

        // Yearly at the moment maybe make also controllable
        this.km_truck = 37357079;

        // 3. Emission factors: gWh / ton CO2 / m3

        // m3 per km
        this.average_car_consumption = 0.005;
        this.average_truck_consumption = 0.03; //check
        this.average_bus_consumption = 0.03; //check
        // gwh per km
        this.electric_car_consumption = 0.014;
        this.electric_bus_consumption = 0.050; //check

        // GWh per m3 from https://www.miljofordon.se/bilar/miljoepaaverkan/
        this.energy_carmix = 9.100;
        this.energy_diesel = 9.800;
        this.energy_hvo = 9.440;
        this.energy_hydrogen = 2.3; //check
        this.energy_biogas = 9.4; //check

        // ton CO2 per m3
        this.co2_biodiesel = 0;
        this.co2_gasoline = 2.28;
        this.co2_diesel = 2.68;
        this.co2_carmix = 2.28;

        // ton CO2 / GWh update from 0 to energy mix including imported
        this.co2_electricity = 0;


        // 4. Fixed emissions (at the moment) ton CO2 and energy GWh
        this.airplanes =  8527;
        this.industrial_vehicles = 18358;
        this.other_vehicles = 1328;
        this.housing = 13956;
        this.industry = 5809;
        this.publicservices = 10227;

        // Add numbers afterwards
        this.electricity = 0;
        this.fossil_fuels = 0;
        this.biofuels = 0;
        this.forestfuel = 0;
        this.electricity_nonren = 0.1;

        this.listeners = [];

        this.update();
    }

    addListener(func) {
        this.listeners.push(func);
    }

    update() {
        // Calculate amount of kilometers
        this.total_km_personal = (this.total_short_trips * (1-this.percentage_bike_s - this.percentage_bus_s) + this.total_medium_trips * (1 - this.percentage_bus_m - this.percentage_bike_m) + this.total_long_trips * (1-this.percentage_bus_l))*52;
        this.total_km_bus = (this.total_short_trips * this.percentage_bus_s + this.total_medium_trips * this.percentage_bus_m + this.total_long_trips * this.percentage_bus_l) * 52;        

        // Calculate energy use
        this.transp_electricity = this.total_km_personal * this.personal_electric * this.electric_car_consumption + this.total_km_bus * this.bus_el * this.electric_bus_consumption;
        
        this.transp_fossil = this.total_km_personal * this.personal_fossil * this.average_car_consumption * this.energy_carmix + this.km_truck * this.trucks_fossil * this.average_truck_consumption * this.energy_diesel + this.total_km_bus * this.bus_fossil * this.average_bus_consumption * this.energy_diesel;
        this.transp_fossil /= 1000;
        
        this.transp_bio = this.total_km_bus * this.bus_bio * this.average_bus_consumption * this.energy_biogas + this.km_truck * this.trucks_bio * this.average_truck_consumption * this.energy_hvo;
        this.transp_bio /= 1000;

        this.dataEnergi = [
            this.fossil_fuels + this.transp_fossil,
            (this.electricity + this.transp_electricity)*this.electricity_nonren,
            this.forestfuel,
            (this.electricity + this.transp_electricity)*(1-this.electricity_nonren),
            this.biofuels + this.transp_bio
        ];

        // Calculate CO2 emissions
        this.personal_fossil_co2 = this.total_km_personal * this.personal_fossil * this.average_car_consumption * this.co2_gasoline;
        this.personal_el_co2 = this.total_km_personal * this.personal_electric * this.electric_car_consumption * this.co2_electricity;
        this.personal_car_co2 = this.personal_fossil_co2 + this.personal_el_co2;
        
        this.bus_co2 = this.total_km_bus * this.bus_bio * this.co2_biodiesel + this.total_km_bus * this.bus_el * this.co2_electricity + this.total_km_bus;        
        
        this.trucks_co2 = this.km_truck * this.co2_diesel / 1000;

        this.total = this.personal_car_co2 + this.trucks_co2 + this.airplanes + this.bus_co2 + this.other_vehicles + this.industrial_vehicles + this.housing + this.industry + this.publicservices;
        this.saved = this.start - this.total;

        for (let func of this.listeners) {
            func();
        }

    }

    update_personal_el(new_perc) {
        // Jorge: discuss with the people in Växjö about how to do this exactly
        const den = this.personal_bio + this.personal_fossil;
        const fossil_perc = this.personal_fossil / den;
        const bio_perc = this.personal_bio / den;
        
        this.personal_electric = new_perc;
        this.personal_fossil = fossil_perc * (1 - new_perc);
        this.personal_bio = bio_perc * (1 - new_perc);

        this.update();
    }

    update_personal_bio(new_perc) {
        // Jorge: discuss with the people in Växjö about how to do this exactly
        const den = this.personal_electric + this.personal_fossil;
        const fossil_perc = this.personal_fossil / den;
        const el_perc = this.personal_electric / den;
        
        this.personal_electric = el_perc * (1 - new_perc);
        this.personal_fossil = fossil_perc * (1 - new_perc);
        this.personal_bio = new_perc;

        this.update();
    }

}

// Misc. notes:
// ---
// total_km -> total_km_personal
// bus_consumption -> average_bus_consumption
// co2_fossil -> co2_gasoline
// trucks_co2 / 1000 (it was too large, nothing else is visible in the icicle)
// the values for dataEnergi don't look right
// I am a bit confused about bränslemix, not sure what to show.
// transp_fossil and transp_bio divided by 1000 to be able to see anything, but not sure if correct.
// The slider for bränslemix defines percentage, not raw numbers. Is that right?
// I noticed that transp_bio does not use personal_bio percentage... is that right?
