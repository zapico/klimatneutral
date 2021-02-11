// Start variables

// Population at the moment does not affect things but it should.
population = 92567;
start = 173476;

// 1. Energy mix (This connects to sliders)

personal_fossil = 0.9;
personal_electric = 0.05;
personal_bio = 0.05;

trucks_fossil = 0.9;
trucks_bio = 0.1;
trucks_hydro = 0;

bus_bio = 0.7;
bus_el = 0.15;
bus_fossil = 0.15;

// 2. Amount driving (change later to real data) in km. This connects to sliders too

// Per week
total_short_trips = 50;
percentage_bike_s = 0.2;
percentage_bus_s = 0.2;

total_medium_trips = 100;
percentage_bike_m = 0.05;
percentage_bus_m = 0.1;

total_long_trips = 150;
percentage_bus_l = 0.1;

// Yearly at the moment maybe make also controllable
km_truck = 37357079;

// 3. Emission factors: gWh / ton CO2 / m3

// m3 per km
average_car_consumption = 0.005;
average_truck_consumption = 0.03; //check
average_bus_consumption = 0.03; //check
// gwh per km
electric_car_consumption = 0.014;
electric_bus_consumption = 0.050; //check

// GWh per m3 from https://www.miljofordon.se/bilar/miljoepaaverkan/
energy_carmix = 9.100
energy_diesel = 9.800
energy_hvo = 9.440
energy_hydrogen = 2.3 //check
energy_biogas = 9.4 //check

// ton CO2 per m3
co2_biodiesel = 0;
co2_gasoline = 2.28;
co2_diesel = 2.68;
co2_carmix = 2.28;

// ton CO2 / GWh update from 0 to energy mix including imported
co2_electric = 0;


// 4. Fixed emissions (at the moment) ton CO2 and energy GWh
airplanes =  8527;
industrial_vehicles = 18358;
other_vehicles = 1328;
housing = 13956;
industry = 5809;
publicservices = 10227;

// Add numbers afterwards
electricity = 0;
fossil_fuels = 0;
biofuels = 0;
forestfuel = 0;
electricity_nonren = 0.1;

// 5. Re calculation of emissions

function ReCalculate(){
  // Calculate amount of kilometers
  total_km_personal = (total_short_trips*(1-percentage_bike_s-percentage_bus_s) + total_medium_trips*(1 - percentage_bus_m - percentage_bike_m) +total_long_trips*(1-percent_bus_l))*52;
  total_km_bus = (total_short_trips*percentage_bus_s + total_medium_trips*percentage_bus_m + total_long_trips*percent_bus_l)*52;

  // Calculate energy use
  transp_electricity =  total_km*personal_electric*electric_car_consumption +  total_km_bus*bus_el*el_bus_consumption;
  transp_fossil = total_km*personal_fossil*average_car_consumption*energy_carmix + km_truck*trucks_fossil*average_truck_consumption*energy_diesel + total_km_bus*bus_fossil*bus_consumption*energy_diesel;
  transp_bio = total_km_bus*bus_bio*bus_consumption*energy_biogas + km_truck*trucks_bio*average_truck_consumption*energy_hvo;

  const dataEnergi = [
      fossil_fuels + transp_fossil;
      (electricity + transp_electricity)*electricity_nonren;
      forestfuels;
      (electricity + transp_electricity)*(1-electricity_nonren);
      biofuels + transp_bio;
  ]

  // Calculate CO2 emissions
  personal_car_co2 = total_km*personal_fossil*average_car_consumption*co2_fossil + total_km*personal_electric*electric_car_consumption*co2_electric;
  bus_co2 = total_km_bus*bus_bio*co2_biodiesel + total_km_bus*bus_el*co2_electricity + total_km_bus;
  trucks_co2 = km_truck*co2_diesel;

  total = personal_car_co2 + trucks_co2 + airplanes + bus_co2 + other_vehicles + industrial_vehicles + housing + industry + publicservices;
  saved = start - total;

  icicle_data:
  {
    "name" : "totalc02",
    "children":[
          {
            "name":"transport",
            "children" : [
              {"name":"personbilar", "value" : personal_car_co2},
              {"name":"lastbilar", "value" : trucks_co2},
              {"name":"flygg", "value" : airplanes},
              {"name":"bussar", "value" : bus_co2},
              {"name":"annat transport", "value" : other_vehicles},
              {"name":"arbetsmaskiner", "value" : industrial_vehicles}]},
          {"name": "bostad", "value": housing},
          {"name": "industri", "value" : industry},
          {"name": "offentlig", "value" : publicservices},
          {"name": "sparat", "value" : saved}]
  }


  // Update graphs
  update_icicle();
  update_energy();

}
