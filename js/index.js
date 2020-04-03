// Data initialization

// This one is for reference; it never changes
const dataKlimatutslapp = {
	name : "total",
	color : '333333',
	children:[
        {
            name:"transport",
            color: '58ad9b',
            children : [
                {name:"personbilar", value : 81003, color: '3d7c6e',},
                {name:"lastbilar", value : 11259,  color: '458d7e',},
                {name:"flygg", value : 8527,  color: '58ad9b',},
                {name:"bussar", value : 29833,  color: '69b5a5',},
                {name:"annat_transport", value : 1328,  color: '7abeaf',},
                {name:"arbetsmaskiner", value : 19411,  color: '8bc6ba',}
            ]
        },
        {name: "bostad", value: 13879,  color: 'D25D44',},
        {name: "industri", value : 5796,  color: 'F9BD47',},
        {name: "offentlig", value : 10185,  color: 'F7972B',},
        {name: "sparat", value : 0,  color: 'eeeeee',}
    ]
}

// This a clone for presentation; it will change often based on the reference above
const dataKlimatutslappClone = JSON.parse(JSON.stringify(dataKlimatutslapp));

const dataTransport = [
    223.391+282.607,
    32.817,
    4.635,
    13.670+122.020+22.110+22.027+2.222
];

const dataTransportBehavior = [
    570000,
		133443
];

const dataEnergi = [
    607.0728044,
    184.6099599,
    1036.931,
    387.1508401,
    72.29361334
]

// Views

function makeIcicleChart() {
    return Icicle()
        .orientation('lr')
        .data(dataKlimatutslappClone)
        .width(580)
        .height(800)
        .color('color')
        (document.getElementById('chart'));
}

var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: dataTransport,
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

var config2 = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: dataTransportBehavior,
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

var config_energy = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: dataEnergi,
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


window.onload = function() {
    // var colorNames = Object.keys(window.chartColors);

    // Create visualizations

    var ctx = document.getElementById('chart-area').getContext('2d');
    const myDoughnut = new Chart(ctx, config);

    var ctx2 = document.getElementById('chart-area2').getContext('2d');
    window.myDoughnut2 = new Chart(ctx2, config2);

    var ctx_energy = document.getElementById('energy-chart-area').getContext('2d');
    window.myDoughnut3 = new Chart(ctx_energy, config_energy);

    const icicleChart = this.makeIcicleChart();

    // Create controls

    $( "#slider_el" ).slider({
        orientation: "horizontal",
        min: 1,
        max: 100,
        value: 2,
        slide: refreshElBilar,
        change: refreshElBilar
    } );

    $( "#slider_bus" ).slider({
        orientation: "horizontal",
        min: 1,
        max: 100,
        value: 50,
        slide: refreshBussar,
        change: refreshBussar
    } );

    $( "#slider_bio" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 2,
        slide: refreshBussar,
        change: refreshBussar
    } );
		$( "#slider_hydrogen" ).slider({
				orientation: "horizontal",
				range: "min",
				max: 100,
				value: 2,
				slide: refreshBussar,
				change: refreshBussar
		} );


    $( "#slider_kollektiv1" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 42,
        slide: refreshBussar,
        change: refreshBussar
    } );
		$( "#slider_kollektiv2" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 26,
        slide: refreshBussar,
        change: refreshBussar
    } );
		$( "#slider_kollektiv3" ).slider({
				orientation: "horizontal",
				range: "min",
				max: 100,
				value: 5,
				slide: refreshBussar,
				change: refreshBussar
		} );


		$( "#slider_befolkning" ).slider({
				orientation: "horizontal",
				range: "min",
				max: 1500004,
				value: 91060,
				slide: refreshBussar,
				change: refreshBussar
		} );


    // Setup events

    function refreshElBilar() {
        var antalElBilar = $( "#slider_el" ).slider( "value" );

        // Update donuts
        dataTransport[2] = (4.635)*antalElBilar;
        dataTransport[0] = (((223.391+282.607)/70)*100)-antalElBilar;
        myDoughnut.update();

        // Update icicle
				current = dataKlimatutslapp.children[0].children[0].value;
				//provisional calculation!
				saved = (dataKlimatutslapp.children[0].children[0].value /100)*antalElBilar;

        dataKlimatutslappClone.children[0].children[0].value =
            antalElBilar == 0 ? 0 : current-saved;
						dataKlimatutslappClone.children[4].value =
								antalElBilar == 0 ? 0 : saved;
        icicleChart.data(dataKlimatutslappClone);

				// Recalculate total
				total = 173476 - dataKlimatutslappClone.children[4].value;
				percentage_change = (saved*100)/173476;
				//update
				$("total2030" ).text(Math.round(total));
				$("change" ).text(Math.round(percentage_change));

    };

    function refreshBussar() {
        var antalBusresor = $( "#slider_bus" ).slider( "value" );

        // Update donuts
        dataTransport[0] = (223.391+282.607)/70*100-antalBusresor;
        myDoughnut.update();

        // Update icicle
        dataKlimatutslappClone.children[0].children[3].value =
            antalBusresor == 0 ? 0 : dataKlimatutslapp.children[0].children[3].value / antalBusresor;
        icicleChart.data(dataKlimatutslappClone);
    };

};
