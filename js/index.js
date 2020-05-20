// TODO Separate the colors into an easier-to-change colormap: name -> color


function makeDonutTransport(id, model) {
    const data = [
        model.personal_fossil,
        model.personal_electric,
        model.personal_bio
    ];

    const ctx = document.getElementById(id).getContext('2d');
    const config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    "#4C4744",
                    window.chartColors.orange,
                    window.chartColors.yellow,
                    "#91BB11"
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Fossil',
                'El',
                'Bio'
            ]
        },
        options: {
            responsive: true,
            title: {
                display: false,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    const myDoughnut = new Chart(ctx, config);
    $("#slider_pers_el").slider({
        orientation: "horizontal",
        min: 0.05,
        max: 0.95,
        step: 0.01,
        value: model.personal_electric,
        slide: refreshElBilar,
        change: refreshElBilar
    });

    $("#slider_pers_bio").slider({
        orientation: "horizontal",
        min: 0.05,
        max: 0.95,
        step: 0.01,
        value: model.personal_bio,
        slide: refreshBioBilar,
        change: refreshBioBilar
    });

    function refreshElBilar(e) {
        // Since one slider is updating the others, we need to make sure to only treat original events here. Non-original events are those triggered by updating *other* sliders, and they should not be treated or else we get an infinite loop.
        if (e.originalEvent) {
            var antalElBilar = $("#slider_pers_el").slider("value");

            model.update_personal_el(antalElBilar);

            myDoughnut.data.datasets[0].data[0] = model.personal_fossil;
            myDoughnut.data.datasets[0].data[1] = model.personal_electric;
            myDoughnut.data.datasets[0].data[2] = model.personal_bio;
            myDoughnut.update();

            $("#slider_pers_bio").slider("value", model.personal_bio);
        }
    };

    function refreshBioBilar(e) {
        // Since one slider is updating the others, we need to make sure to only treat original events here. Non-original events are those triggered by updating *other* sliders, and they should not be treated or else we get an infinite loop.
        if (e.originalEvent) {
            var antalBioBilar = $("#slider_pers_bio").slider("value");

            model.update_personal_bio(antalBioBilar);

            myDoughnut.data.datasets[0].data[0] = model.personal_fossil;
            myDoughnut.data.datasets[0].data[1] = model.personal_electric;
            myDoughnut.data.datasets[0].data[2] = model.personal_bio;
            myDoughnut.update();

            $("#slider_pers_el").slider("value", model.personal_electric);
        }
    };
}

function makeDonutTrucks(id, model) {

        const data = [
            model.trucks_fossil,
            model.trucks_hydro,
            model.trucks_bio
        ];

        const ctx = document.getElementById(id).getContext('2d');
        const config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: [
                        "#4C4744",
                        window.chartColors.orange,
                        window.chartColors.yellow,
                        "#91BB11"
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'Fossil',
                    'Väte',
                    'Bio'
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Chart.js Doughnut Chart'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        const myDoughnut_trucks = new Chart(ctx, config);

        $("#slider_truck_bio").slider({
            orientation: "horizontal",
            range: 1,
            max: 90,
            value: model.trucks_bio*100,
            slide: refreshTrucks,
            change: refreshTrucks
        });

        $("#slider_hydrogen").slider({
            orientation: "horizontal",
            range: 1,
            max: 90,
            value: model.trucks_hydro*100,
            slide: refreshTrucks,
            change: refreshTrucks
        });

        function refreshTrucks(e) {
              var new_bio = $("#slider_truck_bio").slider("value")/100;
              var new_hydro = $("#slider_hydrogen").slider("value")/100;
              model.update_trucks(new_bio,new_hydro);
        }

        model.addListener(function() {
            const data = [
                model.trucks_fossil,
                model.trucks_hydro,
                model.trucks_bio
            ];
            for (let i = 0; i < data.length; ++i) {
                myDoughnut_trucks.data.datasets[0].data[i] = data[i];
            }
            myDoughnut_trucks.update();
        })
}

function makeDonutEl(id, model) {
        const data = [
            model.electricity_veab,
            model.electricity_solar,
            model.electricity_other_renewables,
            model.electricity_imported
        ];

        const ctx = document.getElementById(id).getContext('2d');
        const config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: [
                        "#4C4744",
                        window.chartColors.orange,
                        window.chartColors.yellow,
                        "#91BB11"
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'VEAB',
                    'Solar',
                    'Renewables',
                    'Imported'
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Chart.js Doughnut Chart'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        const myDoughnut_el = new Chart(ctx, config);
        $("#slider_el").slider({
            orientation: "horizontal",
            range: 1,
            max: 100,
            value: model.electricity_imported_percentage*100,
            slide: refreshEl,
            change: refreshEl
        });


        function refreshEl(){
          var new_perc = $("#slider_el").slider("value")/100;
          model.update_el(new_perc);
        }

        model.addListener(function() {
            const data = [
                model.electricity_veab,
                model.electricity_solar,
                model.electricity_other_renewables,
                model.electricity_imported
            ];
            for (let i = 0; i < data.length; ++i) {
                myDoughnut_el.data.datasets[0].data[i] = data[i];
            }
            myDoughnut_el.update();
        })
}

function makeDonutTransportBehavior(id, data) {
    var ctx = document.getElementById(id).getContext('2d');
    const config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.green
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Privat',
                'Kollektiv',
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            // title: {
            //     display: false,
            //     text: 'Chart.js Doughnut Chart'
            // },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    return new Chart(ctx, config);
}

// Funtion to create circles representing energy use
function makeCircles(model) {

    const data = [
        {
            id: "e_bio",
            label: "Bioenergi",
            modelAttr: "biofuels",
            color: "#4DA167"
        },
        {
            id: "e_forest",
            label: "Trädbränsle",
            modelAttr: "forestfuel",
            color: "#12664F"
        },
        {
            id: "e_renewable",
            label: "Förnybar el",
            modelAttr: "electricity",
            color: "#BAB700"
        },
        {
            id: "e_nonrenewable",
            label: "Annat el",
            modelAttr: "electricity_nonren",
            color: "#77878B"
        },
        {
            id: "e_fossil",
            label: "Fossil",
            modelAttr: "fossil_fuels",
            color: "#4D5057"
        },
    ];

    const max_size = 200000;

    function update() {
        data.forEach(d => {
            const circle = Math.round(Math.sqrt(max_size * (model[d.modelAttr] / 3600) / 3.1416));
            const margin = (100 - circle) / 2;
            document.getElementById(d.id).innerHTML = '<div style="width:' + circle + 'px; height:' + circle + 'px;margin-left:' + margin + 'px;margin-top:' + margin + 'px; background:' + d.color + '; border-radius:400px; -moz-border-radius:400px;"></div><div class="energylabel">' + d.label + '</div>';
        });
    }

    model.addListener(update);
    update();
}

window.onload = async function () {
    // var colorNames = Object.keys(window.chartColors);

    const model = new Model();

    // Simply instantiating the wrapper will take care of everything
    new IcicleWrapper(model, 'general-chart');

    // Load the data from the server, assynchronously
    //const myDoughnut3 = this.makeDonutEnergi('energy-chart-area', model.dataEnergi);
    makeCircles(model);

    // Simply calling the closure will take care of everything
    makeDonutTransport('transport_energy_canvas', model);
    makeDonutTrucks('heavytransport_energy_canvas',model);
    makeDonutEl('electricity_canvas',model);
    // Load the data from the server, assynchronously
    const dataTransportBehavior = await d3.json("/data/transport_behavior.json");
    const myDoughnut2 = this.makeDonutTransportBehavior('transport_behavior_canvas', dataTransportBehavior);


    // Create controls

    $("#slider_korta").slider({
        orientation: "horizontal",
        min: 1,
        max: 5000,
        value: model.total_short_trips,
        slide: refreshBehavior,
        change: refreshBehavior
    });
    $("#slider_mellan").slider({
        orientation: "horizontal",
        min: 1,
        max:5000,
        value: model.total_medium_trips,
        slide: refreshBehavior,
        change: refreshBehavior
    });
    $("#slider_langa").slider({
        orientation: "horizontal",
        min: 1,
        max: 5000,
        value: model.total_long_trips,
        slide: refreshBehavior,
        change: refreshBehavior
    });

    $("#slider_kollektiv1").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: model.kollektiv_s*100,
        slide: refreshBehavior,
        change: refreshBehavior
    });
    $("#slider_kollektiv2").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: model.kollektiv_m*100,
        slide: refreshBehavior,
        change: refreshBehavior
    });
    $("#slider_kollektiv3").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: model.percentage_bus_l*100,
        slide: refreshBehavior,
        change: refreshBehavior
    });

    $("#slider_befolkning").slider({
        orientation: "horizontal",
        range: "min",
        max: 150004,
        value: 91060,
        slide: refreshBefolkning,
        change: refreshBefolkning
    });

    // Setup events

    function refreshBehavior() {
          // Update values
          var antal_km_s = $("#slider_korta").slider("value");
          var antal_km_m = $("#slider_mellan").slider("value");
          var antal_km_l = $("#slider_langa").slider("value");

          var percentage_s =  $("#slider_kollektiv1").slider("value")/100;
          var percentage_m =  $("#slider_kollektiv2").slider("value")/100;
          var percentage_l =  $("#slider_kollektiv3").slider("value")/100;

          model.update_behavior(antal_km_s,antal_km_m,antal_km_l,percentage_s,percentage_m,percentage_l);

    };
    function refreshBefolkning() {
          var new_pop = $("#slider_befolkning").slider("value");
          model.update_population(new_pop);
    };





};
