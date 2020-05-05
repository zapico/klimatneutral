
function makeIcicleChart(data) {
    return Icicle()
        .orientation('lr')
        .data(data)
        .width(580)
        .height(800)
        .color('color')
        (document.getElementById('chart'));
}

function makeDonutTransport(id, data) {
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
                'Flygg',
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
    return new Chart(ctx, config);
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


window.onload = async function() {
    // var colorNames = Object.keys(window.chartColors);

    // Load the data from the server, assynchronously
    const dataKlimatutslapp = await d3.json("/data/klimat_utslapp.json");

    // This a clone for presentation; it will change often based on the reference above
    const dataKlimatutslappClone = JSON.parse(JSON.stringify(dataKlimatutslapp));
    const icicleChart = this.makeIcicleChart(dataKlimatutslappClone);

    // I left this here (instead of moving to server) because there are math operations in it
    const dataTransport = [
        223.391+282.607,
        32.817,
        4.635,
        13.670+122.020+22.110+22.027+2.222
    ];

    const myDoughnut = makeDonutTransport('chart-area', dataTransport);

    // Load the data from the server, assynchronously
    const dataTransportBehavior = await d3.json("/data/transport_behavior.json");
    const myDoughnut2 = this.makeDonutTransportBehavior('chart-area2', dataTransportBehavior);

    // Load the data from the server, assynchronously
    const dataEnergi = await d3.json("/data/energi.json");

    const myDoughnut3 = this.makeDonutEnergi('energy-chart-area', dataEnergi);

    // Create controls

    $("#slider_el").slider({
        orientation: "horizontal",
        min: 1,
        max: 100,
        value: 2,
        slide: refreshElBilar,
        change: refreshElBilar
    });

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

    function refreshElBilar() {
        var antalElBilar = $("#slider_el").slider("value");

        // Update donuts
        dataTransport[2] = (4.635) * antalElBilar;
        dataTransport[0] = (((223.391 + 282.607) / 70) * 100) - antalElBilar;
        myDoughnut.update();

        // Update icicle
        current = dataKlimatutslapp.children[0].children[0].value;
        //provisional calculation!
        saved = (dataKlimatutslapp.children[0].children[0].value / 100) * antalElBilar;

        dataKlimatutslappClone.children[0].children[0].value =
            antalElBilar == 0 ? 0 : current - saved;
        dataKlimatutslappClone.children[4].value =
            antalElBilar == 0 ? 0 : saved;
        icicleChart.data(dataKlimatutslappClone);

        // Recalculate total
        total = 173476 - dataKlimatutslappClone.children[4].value;
        percentage_change = (saved * 100) / 173476;
        //update
        $("total2030").text(Math.round(total));
        $("change").text(Math.round(percentage_change));

    };

    function refreshBussar() {
        var antalBusresor = $("#slider_bus").slider("value");

        // Update donuts
        dataTransport[0] = (223.391 + 282.607) / 70 * 100 - antalBusresor;
        myDoughnut.update();

        // Update icicle
        dataKlimatutslappClone.children[0].children[3].value =
            antalBusresor == 0 ? 0 : dataKlimatutslapp.children[0].children[3].value / antalBusresor;
        icicleChart.data(dataKlimatutslappClone);
    };

};
