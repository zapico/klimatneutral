function makeDonutMaterial(id, model) {
    const data = [
      model.concrete_co2,
      model.isolation_co2,
      model.wood_co2,
      model.roof_co2
    ];

    const ctx = document.getElementById(id).getContext('2d');
    const config = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: data,
            backgroundColor: [
              "#7C6354",
              "#FFC857",
              "#119DA4",
              "#19647E"
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Stomme, Fasad & Tak',
            'Insidan',
            'Installationer',
            'Schackt'
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: ''
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      };
    const myDoughnut = new Chart(ctx, config);
};

function makeDonutCircularity(id, model) {
    const data = [
      model.green,
      model.yellow,
      model.red
    ];

    const ctx = document.getElementById(id).getContext('2d');
    const config = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: data,
            backgroundColor: [
              "#80b918",
              window.chartColors.yellow,
              window.chartColors.red,
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Circulära material',
            'Energiåtervinning',
            'Deponi',
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: false,
            text: ''
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      };
    const myDoughnut = new Chart(ctx, config);
};

function makeBarChart(id, model){
  const ctx2 = document.getElementById(id).getContext('2d');
  const config2 = {
    tooltips: {
        enabled: false
    },
    hover :{
        animationDuration:0
    },
    scales: {
        xAxes: [{
          gridLines: {
              display:false,
              color: "#fff",
              zeroLineWidth: 0},
            ticks: {
                display:false,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:false
            },
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
            ticks: {
                display:false,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:false
    },

    animation: {
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "9px Open Sans";
            ctx.fillStyle = "#fff";

        }
    },
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
  };

    const myChart2 = new Chart(ctx2, {
        type: 'horizontalBar',
        data: {
       labels: ["CO2"],

       datasets: [{
           data: [model.co2_m2],
           backgroundColor: "rgba(63,103,126,1)",
           hoverBackgroundColor: "rgba(50,90,100,1)",

       },{
           data: [0.25],
           backgroundColor: "#fff",
           hoverBackgroundColor: "#fff",
           borderColor: "rgba(63,103,126,1)",
           borderWidth: 1
       }
     ]
   },
        options: config2,
    });
};

function makeBarChartEnergy(id, model){
  const ctx4 = document.getElementById(id).getContext('2d');
  const config4 = {
    tooltips: {
        enabled: false
    },
    hover :{
        animationDuration:0
    },
    scales: {
        xAxes: [{
          gridLines: {
              display:false,
              color: "#fff",
              zeroLineWidth: 0},
            ticks: {
                display:false,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:false
            },
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
            ticks: {
                  display:false,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:false
    },

    animation: {
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "9px Open Sans";
            ctx.fillStyle = "#fff";


        }
    },
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
  };

    const myChart4 = new Chart(ctx4, {
        type: 'horizontalBar',
        data: {
       labels: ["kwh"],

       datasets: [{
           data: [model.energy_m2],
           backgroundColor: "rgb(255, 224, 0,1)",
       },{
           data: [25],
           backgroundColor: "#fff",
           hoverBackgroundColor: "#fff",
           borderColor: "rgba(255, 224, 0,1)",
           borderWidth: 1
       }]
   },
        options: config4,
    });
};

window.onload = async function () {

    const model = new Model();

    makeDonutMaterial('chart-area', model);
    makeDonutCircularity('chart-area-circular', model);
    makeBarChart('chartbar-area', model);
    makeBarChartEnergy('chartbar-area-energy', model);

    $( "#grund" ).selectmenu({change: refreshBehavior});
    $( '#grund' ).append($('<option>', { value: model.concrete_insitu, text: 'Betong in-situ' }));
    $( '#grund' ).append($('<option>', { value: model.concrete_prefab, text: 'Betong prefab' }));
    $( '#grund' ).append($('<option>', { value: model.light_blocks, text: 'Lätta block' }));

    $( "#grund_armering" ).selectmenu();
    $( "#grund_armering" ).append($('<option>', { value: model.orebased_steel, text: 'Stål ny' }));
    $( "#grund_armering" ).append($('<option>', { value: model.scrapbased_steel, text: 'Stål (återvunnen)' }));
    $( "#grund_armering" ).append($('<option>', { value: model.mixed_steel, text: 'Stål (50/50)' }));

    $( "#stomme" ).selectmenu();

    $( "#isolering" ).selectmenu();
    $( "#isolering" ).append($('<option>', { value: model.glasswool, text: 'Glasswool' }));
    $( "#isolering" ).append($('<option>', { value: model.rockwool, text: 'Rockwool' }));
    $( "#isolering" ).append($('<option>', { value: model.cellulose, text: 'Cellulosa' }));
    $( "#isolering" ).append($('<option>', { value: model.cellplast, text: 'Cellplast' }));

    $( "#fasad" ).selectmenu();
    $( "#fasad" ).append($('<option>', { value: model.wood_panels, text: 'Träpanel' }));
    $( "#fasad" ).append($('<option>', { value: model.wood_panels, text: 'Puts' }));
    $( "#fasad" ).append($('<option>', { value: model.wood_panels, text: 'Komposit' }));

    $( "#windows" ).selectmenu();
    $( "#innerv" ).selectmenu();

    $( "#iso_in" ).selectmenu();
    $( "#iso_in" ).append($('<option>', { value: model.glasswool, text: 'Glasswool' }));
    $( "#iso_in" ).append($('<option>', { value: model.rockwool, text: 'Rockwool' }));
    $( "#iso_in" ).append($('<option>', { value: model.cellulose, text: 'Cellulosa' }));
    $( "#iso_in" ).append($('<option>', { value: model.cellplast, text: 'Cellplast' }));

    $( "#golv" ).selectmenu();
    $( "#roof_material" ).selectmenu();
    $( "#heating" ).selectmenu();

    $( "#window_u" ).spinner({
          spin: function( event, ui ) {
            if ( ui.value > 10 ) {
              $( this ).spinner( "value", -10 );
              return false;
            } else if ( ui.value < -10 ) {
              $( this ).spinner( "value", 10 );
              return false;
            }
          }
        });
    $( "#grund_thick" ).spinner({
              step: 0.1,
              spin: function( event, ui ) {
                if ( ui.value > 10 ) {
                  $( this ).spinner( "value", 10 );
                  return false;
                } else if ( ui.value < 0.3 ) {
                  $( this ).spinner( "value", 0.3 );
                  return false;
                }
                refreshBehavior();
              }
            });

    $( "#slider_m2" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 10000,
      value: model.planyta,
      slide: refreshBehavior,
      change: refreshBehavior
    });

    $( "#slider_hj" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 100,
      value: 2
    } );

    $( "#slider_vng" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 50,
      value: 2
    } );

    $( "#slider_plant" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 10000,
    value: 2
  } );

    $( "#slider_isolering" ).slider({
  orientation: "horizontal",
  range: "min",
  max: 1000,
  value: 200
  } );

    $( "#slider_takvinkel" ).slider({
  orientation: "horizontal",
  range: "min",
  max: 45,
  value: model.roof_angle
} );

$( "#slider_solceller" ).slider({
orientation: "horizontal",
range: "min",
max: 500,
value: 0
} );

function refreshBehavior() {
      // Update values

      model.planyta = $("#slider_m2").slider("value");
      model.foundation_material = $( "#grund" ).val();
      model.foundation_armering = $( "#grund_armering" ).val();
      model.foundation_thickness = $( "#grund_thick" ).val();
      $( "#kvm_value" ).html("<p>PLANYTA: " + model.planyta + " kvm</p>" );
      model.update();

};

  };
