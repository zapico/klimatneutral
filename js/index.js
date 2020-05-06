
// TODO Put the Icicle in a class, too. Include the methods for generating the data and updating the graph. Keep a saved reference of the model after the constructor.
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

function makeDonutEnergi(id, data) {
    var ctx = document.getElementById(id).getContext('2d');
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    "#4C4744",
                    "#595945",
                    "#007730",
                    "#CEEA6A",
                    "#91BB11"
                ],
                label: 'Energi'
            }],
            labels: [
                'Fossil',
                'Ej förnybar el',
                'Trädbränslen',
                'Förnybar el',
                'Biobränsle'
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
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


window.onload = async function () {
    // var colorNames = Object.keys(window.chartColors);

    const model = new Model();
    
    // Simply instantiating the wrapper will take care of everything
    new IcicleWrapper(model, 'general-chart');

    // Load the data from the server, assynchronously
    const myDoughnut3 = this.makeDonutEnergi('energy-chart-area', model.dataEnergi);

    // Simply calling the closure will take care of everything
    makeDonutTransport('transport_energy_canvas', model);

    // Load the data from the server, assynchronously
    const dataTransportBehavior = await d3.json("/data/transport_behavior.json");
    const myDoughnut2 = this.makeDonutTransportBehavior('transport_behavior_canvas', dataTransportBehavior);

    

    // Create controls

    $("#slider_bus").slider({
        orientation: "horizontal",
        min: 1,
        max: 100,
        value: 50,
        slide: refreshBussar,
        change: refreshBussar
    });

    $("#slider_bio").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 2,
        slide: refreshBussar,
        change: refreshBussar
    });

    $("#slider_kollektiv1").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 42,
        slide: refreshBussar,
        change: refreshBussar
    });
    $("#slider_kollektiv2").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 26,
        slide: refreshBussar,
        change: refreshBussar
    });
    $("#slider_kollektiv3").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 5,
        slide: refreshBussar,
        change: refreshBussar
    });


    $("#slider_befolkning").slider({
        orientation: "horizontal",
        range: "min",
        max: 1500004,
        value: 91060,
        slide: refreshBussar,
        change: refreshBussar
    });

    // Setup events

    function refreshBussar() {
        var antalBusresor = $("#slider_bus").slider("value");

        // Update donuts
        dataTransport[0] = (223.391 + 282.607) / 70 * 100 - antalBusresor;
        myDoughnut.update();

        // Update icicle
        // dataKlimatutslappClone.children[0].children[3].value =
        //     antalBusresor == 0 ? 0 : dataKlimatutslapp.children[0].children[3].value / antalBusresor;
        
    };

};
