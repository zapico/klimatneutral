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
              "#FED000",
              "#ED2939",
            ],
            label: 'C'
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

    animation: false,
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
           borderColor: "rgba(63,103,126,1)",
           borderWidth: 1

       },{
           data: [500-model.co2_m2],
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

    $("#tabs").tabs();

    $( "#grund" ).selectmenu({change: refreshBehavior});
    $( '#grund' ).append($('<option>', { value: model.concrete_insitu, text: 'Betong in-situ' }));
    $( '#grund' ).append($('<option>', { value: model.concrete_prefab, text: 'Betong prefab' }));
    $( '#grund' ).append($('<option>', { value: model.light_blocks, text: 'Lätta block' }));
    $( "#grund" ).selectmenu({select: refreshBehavior });

    $( "#grund_armering" ).selectmenu();
    $( "#grund_armering" ).append($('<option>', { value: model.orebased_steel, text: 'Stål ny' }));
    $( "#grund_armering" ).append($('<option>', { value: model.scrapbased_steel, text: 'Stål (återvunnen)' }));
    $( "#grund_armering" ).append($('<option>', { value: model.mixed_steel, text: 'Stål (50/50)' }));
    $( "#grund_armering" ).selectmenu({select: refreshBehavior });

    $( "#stomme" ).selectmenu();
    $( "#stomme" ).append($('<option>', { value: model.orebased_steel, text: 'Betong in-situ' }));
    $( "#stomme" ).append($('<option>', { value: model.orebased_steel, text: 'Betong prefab' }));
    $( "#stomme" ).append($('<option>', { value: model.orebased_steel, text: 'Cross-laminated timber' }));
    $( "#stomme" ).append($('<option>', { value: model.orebased_steel, text: 'Light timber frame' }));
    $( "#stomme" ).append($('<option>', { value: model.orebased_steel, text: 'Stål' }));

    $( "#stomme_floor" ).selectmenu();
    $( "#stomme_floor" ).append($('<option>', { value: model.orebased_steel, text: 'Betong in-situ' }));
    $( "#stomme_floor" ).append($('<option>', { value: model.orebased_steel, text: 'Betong prefab' }));
    $( "#stomme_floor" ).append($('<option>', { value: model.orebased_steel, text: 'Cross-laminated timber' }));
    $( "#stomme_floor" ).append($('<option>', { value: model.orebased_steel, text: 'Light timber frame' }));
    $( "#stomme_floor" ).append($('<option>', { value: model.orebased_steel, text: 'Stål' }));

    $( "#stomme_stairs" ).selectmenu();
    $( "#stomme_stairs" ).append($('<option>', { value: model.orebased_steel, text: 'Betong in-situ' }));
    $( "#stomme_stairs" ).append($('<option>', { value: model.orebased_steel, text: 'Betong prefab' }));
    $( "#stomme_stairs" ).append($('<option>', { value: model.orebased_steel, text: 'Cross-laminated timber' }));
    $( "#stomme_stairs" ).append($('<option>', { value: model.orebased_steel, text: 'Light timber frame' }));
    $( "#stomme_stairs" ).append($('<option>', { value: model.orebased_steel, text: 'Stål' }));

    $( "#stomme_roof" ).selectmenu();
    $( "#stomme_roof" ).append($('<option>', { value: model.orebased_steel, text: 'Betong in-situ' }));
    $( "#stomme_roof" ).append($('<option>', { value: model.orebased_steel, text: 'Betong prefab' }));
    $( "#stomme_roof" ).append($('<option>', { value: model.orebased_steel, text: 'Cross-laminated timber' }));
    $( "#stomme_roof" ).append($('<option>', { value: model.orebased_steel, text: 'Light timber frame' }));
    $( "#stomme_roof" ).append($('<option>', { value: model.orebased_steel, text: 'Stål' }));

    $( "#isolering" ).selectmenu();
    $( "#isolering" ).append($('<option>', { value: model.glasswool, text: 'Glasswool' }));
    $( "#isolering" ).append($('<option>', { value: model.rockwool, text: 'Rockwool' }));
    $( "#isolering" ).append($('<option>', { value: model.cellulose, text: 'Cellulosa' }));
    $( "#isolering" ).append($('<option>', { value: model.cellplast, text: 'Cellplast' }));
    $( "#isolering" ).selectmenu({select: refreshBehavior });


    $( "#fasad" ).selectmenu();
    $( "#fasad" ).append($('<option>', { value: model.wood_panels, text: 'Träpanel' }));
    $( "#fasad" ).append($('<option>', { value: model.wood_panels, text: 'Puts' }));
    $( "#fasad" ).append($('<option>', { value: model.wood_panels, text: 'Komposit' }));
    $( "#fasad" ).selectmenu({select: refreshBehavior });

    $( "#windows" ).selectmenu();
    $( "#windows" ).append($('<option>', { value: model.window_wood, text: 'Triple glazed wood frame' }));
    $( "#windows" ).append($('<option>', { value: model.window_pvc, text: 'Triple glazed PVC frame' }));
    $( "#windows" ).append($('<option>', { value: model.window_alu, text: 'Triple glazed aluminium frame' }));

    $( "#innerv" ).selectmenu();

    $( "#iso_in" ).selectmenu();
    $( "#iso_in" ).append($('<option>', { value: model.glasswool, text: 'Glasswool' }));
    $( "#iso_in" ).append($('<option>', { value: model.rockwool, text: 'Rockwool' }));
    $( "#iso_in" ).append($('<option>', { value: model.cellulose, text: 'Cellulosa' }));
    $( "#iso_in" ).append($('<option>', { value: model.cellplast, text: 'Cellplast' }));
    $( "#iso_in" ).selectmenu({select: refreshBehavior });

    $( "#golv" ).selectmenu();
    $( "#roof_material" ).selectmenu();
    $( "#heating" ).selectmenu();


    $("input[type='checkbox']" ).checkboxradio({icon: false});
    $( "input[type='checkbox']").on( "change", refreshEcosystem );


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
      $( "#nr_floors" ).spinner({
            step: 1,
            spin: function( event, ui ) {
                        if ( ui.value > 10 ) {
                          $( this ).spinner( "value", 50 );
                          return false;
                        } else if ( ui.value < 1 ) {
                          $( this ).spinner( "value", 1 );
                          return false;
                        }
              refreshBehavior();
            }
          });
      $( "#nr_floors" ).val(model.floors);
      $( "#floor_height" ).spinner({
            step: 0.1,
            spin: function( event, ui ) {
                      if ( ui.value > 4 ) {
                        $( this ).spinner( "value", 4 );
                        return false;
                      } else if ( ui.value < 2.1 ) {
                            $( this ).spinner( "value", 2.1 );
                        return false;
                        }
          refreshBehavior();
          }
     });
     $( "#floor_height" ).val(model.floor_height);

     $( "#nr_basement" ).spinner({
           step: 1,
           spin: function( event, ui ) {
                     if ( ui.value > 4 ) {
                       $( this ).spinner( "value", 4 );
                       return false;
                     } else if ( ui.value < 2.1 ) {
                           $( this ).spinner( "value", 0 );
                       return false;
                       }
         refreshBehavior();
         }
    });
    $( "#nr_basement" ).val(model.basement);

    $( "#slider_windows" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 100,
    value: model.window_percentage,
    slide: refreshBehavior,
    change: refreshBehavior
    } );

    $( "#slider_tomtyta" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 50000,
      step: 10,
      value: model.tomtyta,
      slide: refreshBehavior,
      change: refreshBehavior
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
    max: 100,
    value: model.gronyta,
    slide: refreshBehavior,
    change: refreshBehavior
  } );

    $( "#slider_isolering" ).slider({
  orientation: "horizontal",
  range: "min",
  value: model.isolation_thickness_ut,
  slide: refreshBehavior,
  change: refreshBehavior
  } );

    $( "#slider_takvinkel" ).slider({
  orientation: "horizontal",
  range: "min",
  max: 45,
  value: model.roof_angle
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

function refreshEcosystem(){
    var et_1 = 0.1;
    var et_2 = 0.1;
    var et_3 = 0.1;
    var et_4 = 0.1;
    if ($( "#checkbox-damm" ).is(":checked")) { et_2 += 0.4; };
    if ($( "#checkbox-frukt" ).is(":checked")) { et_1 += 0.4; et_3 += 0.4; };
    if ($( "#checkbox-bi" ).is(":checked")) { et_1 += 0.4; };
    if ($( "#checkbox-motion" ).is(":checked")) { et_4 += 0.4; };
    if ($( "#checkbox-keep" ).is(":checked")) { et_1 += 0.4; et_2 += 0.4;};
    if (model.gyfactor >= 0.2) {
      et_1 += 0.3;
      et_2 += 0.3;
      et_4 += 0.3;
    } else {
      if (model.gyfactor > 0.1){
        et_1 += 0.1;
        et_2 += 0.1;
        et_4 += 0.1;
      }
    };
    $( "#et_support" ).css('opacity', et_1);
    $( "#et_regulate" ).css('opacity', et_2);
    $( "#et_energy" ).css('opacity', et_3);
    $( "#et_cultural" ).css('opacity', et_4);
};

function refreshBehavior() {
      // Update values

      model.planyta = $("#slider_m2").slider("value");
      model.tomtyta = $("#slider_tomtyta").slider("value");
      model.gronyta = $("#slider_plant" ).slider("value");
      model.foundation_armering = $( "#grund_armering" ).val();
      model.foundation_thickness = $( "#grund_thick" ).val();
      model.isolation_material_ut =  $( "#isolering" ).val();
      model.isolation_thickness_ut =  $("#slider_isolering").slider("value");
      model.isolation_material_in = $( "#iso_in" ).val();
      model.window_percentage = $( "#slider_windows" ).slider("value");
      $( "#kvm_value" ).html("<p>PLANYTA: " + model.planyta + " kvm</p>" );
      $( "#kvm_tomt_value" ).html("<p>TOMTYTA: " + model.tomtyta + " kvm</p>" );
      $( "#iso_thick" ).html("<p>ISOLERING UT: " + model.isolation_thickness_ut + " cm</p>" );
      $( "#window_text" ).html("<p>FÖNSTER: " + model.window_percentage + " % av yta</p>" );
      $( "#info_grona_ytor" ).html("<p>"+ (model.tomtyta-model.planyta)*model.gronyta/100 +" kvm "+ model.gronyta + " % av tillgänglig yta.</p>");
      model.update();

};
function updateTotals(){
  $( "#total_co2" ).html("<p>"+ model.co2_m2+" kg CO<sub>2</sub>/m2</p>");
  $( "#greenfactor" ).html("<h1>"+ model.gyfactor+"</h1>");
  makeBarChart('chartbar-area', model);
  refreshEcosystem();
};
model.addListener(updateTotals);

};
