function makeDonutMaterial(id, model) {
    const data = [
      model.stomme_co2,
      model.foundation_co2,
      model.shell_co2,
      model.inside_co2
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
            label: 'Klimatpåverkan'
          }],
          labels: [
            'Stomme',
            'Grund',
            'Klimatskärm',
            'Insida'
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
            animateScale: false,
            animateRotate: false
          }
        }
      };
    window.myDoughnut = new Chart(ctx, config);
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

    responsive: true,
    legend:{
        display:false
    },

    animation: false,
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
  };
  window.myChart2 = new Chart(ctx2, {
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



window.onload = async function () {

    const model = new Model();

    makeDonutMaterial('chart-area', model);
    //makeBarChart('chartbar-area', model);

    $( "#grund" ).selectmenu({change: refreshBehavior});
    $( '#grund' ).append($('<option>', { value: model.concrete_insitu, text: 'Betong platsgjuten', selected: "selected"}));
    $( '#grund' ).append($('<option>', { value: model.concrete_insitu, text: 'Grön betong platsgjuten' })); //Uppdatera datan
    $( '#grund' ).append($('<option>', { value: model.concrete_prefab, text: 'Betong prefab' }));
    //$( '#grund' ).append($('<option>', { value: model.light_blocks, text: 'Lätta block' }));
    $( '#grund' ).selectmenu("refresh");
    $( "#grund" ).selectmenu({select: refreshBehavior });

    $( "#grund_armering" ).selectmenu();
    $( "#grund_armering" ).append($('<option>', { value: model.orebased_steel, text: 'Stål ny', selected: "selected" }));
    $( "#grund_armering" ).append($('<option>', { value: model.scrapbased_steel, text: 'Stål (återvunnen)' }));
    $( "#grund_armering" ).append($('<option>', { value: model.mixed_steel, text: 'Stål (50/50)' }));
    $( '#grund_armering' ).selectmenu("refresh");
    $( "#grund_armering" ).selectmenu({select: refreshBehavior });

    $( "#grund_iso" ).selectmenu();
    $( "#grund_iso" ).append($('<option>', { value: model.glasswool, text: 'Glasull och makadam' }));
    $( "#grund_iso" ).append($('<option>', { value: model.cellplast, text: 'Cellplast och makadam', selected: "selected" }));
    $( '#grund_iso' ).selectmenu("refresh");
    $( "#grund_iso" ).selectmenu({select: refreshBehavior });

    $( "#stomme" ).selectmenu();
    $( "#stomme" ).append($('<option>', { value: "Betong", text: 'Betong', selected: "selected" }));
    //$( "#stomme" ).append($('<option>', { value: model.frame_prefab_concrete, text: 'Betong prefab' }));
    $( "#stomme" ).append($('<option>', { value:"CLT", text: 'Korslimmat trä' }));
    $( "#stomme" ).append($('<option>', { value: "Timber", text: 'Trästomme' })); //Kolla namnet
    //$( "#stomme" ).append($('<option>', { value: model.frame_steel, text: 'Stål' }));
    $( '#stomme' ).selectmenu("refresh");
    $( "#stomme" ).selectmenu({select: refreshBehavior });

    $( "#isolering" ).selectmenu();
    $( "#isolering" ).append($('<option>', { value: model.glasswool, text: 'Glasull', selected: "selected" }));
    $( "#isolering" ).append($('<option>', { value: model.rockwool, text: 'Mineralull' }));
    $( "#isolering" ).append($('<option>', { value: model.cellulose, text: 'Cellulosa' }));
    $( "#isolering" ).append($('<option>', { value: model.cellplast, text: 'Cellplast' }));
    $( '#isolering' ).selectmenu("refresh");
    $( "#isolering" ).selectmenu({select: refreshBehavior });


    $( "#fasad" ).selectmenu();
    $( "#fasad" ).append($('<option>', { value: model.facad_wood_panels, text: 'Träpanel' }));
    $( "#fasad" ).append($('<option>', { value: model.facad_puts, text: 'Puts', selected: "selected" }));
    $( "#fasad" ).append($('<option>', { value: model.fasad_mineralskiva, text: 'Mineralskiva' })); //Kolla detta
    $( "#fasad" ).append($('<option>', { value: model.fasad_tegel, text: 'Tegel' }));
    //$( "#fasad" ).append($('<option>', { value: model.wood_panels, text: 'Glas' })); //Ska vi ha detta?
    $( '#fasad' ).selectmenu("refresh");
    $( "#fasad" ).selectmenu({select: refreshBehavior });

    $( "#windows" ).selectmenu();
    $( "#windows" ).append($('<option>', { value: model.window_wood, text: 'Treglas trä' }));
    $( "#windows" ).append($('<option>', { value: model.window_pvc, text: 'Treglas PVC' }));
    $( "#windows" ).append($('<option>', { value: model.window_alu, text: 'Treglas aluminium', selected: "selected" }));
    $( '#windows' ).selectmenu("refresh");
    $( "#windows" ).selectmenu({select: refreshBehavior });

    $( "#innerv" ).selectmenu();
    $( "#innerv" ).append($('<option>', { value: model.wood_panels_inne, text: 'Träpanel' }));
    $( "#innerv" ).append($('<option>', { value: model.gips_inne, text: 'Gips', selected: "selected" }));
    $( "#innerv" ).append($('<option>', { value: model.betong_inne, text: 'Betong' }));
    $( '#innerv' ).selectmenu("refresh");
    $( "#innerv" ).selectmenu({select: refreshBehavior });

    $( "#golv" ).selectmenu();
    $( "#golv" ).append($('<option>', { value: model.flooring_wood, text: 'Massivt trä' }));
    $( "#golv" ).append($('<option>', { value: model.flooring_plast, text: 'Plastmatta' }));
    $( "#golv" ).append($('<option>', { value: model.flooring_laminat, text: 'Laminat', selected: "selected" }));
    $( '#golv' ).selectmenu("refresh");
    $( "#golv" ).selectmenu({select: refreshBehavior });

    $( "#roof_material" ).selectmenu();
    $( "#roof_material" ).append($('<option>', { value: model.roof_metal, text: 'Plåt' }));
    $( "#roof_material" ).append($('<option>', { value: model.roof_tiles, text: 'Tegel' }));
    $( "#roof_material" ).append($('<option>', { value: model.roof_concretetiles, text: 'Betongpannor',selected: "selected" }));
    $( "#roof_material" ).append($('<option>', { value: model.roof_sedum, text: 'Sedum' }));
    $( "#roof_material" ).append($('<option>', { value: model.roof_takpapp, text: 'Takpapp' }));
    $( '#roof_material' ).selectmenu("refresh");
    $( "#roof_material" ).selectmenu({select: refreshBehavior });

    //$( "#heating" ).selectmenu();
    //$( "#heating" ).append($('<option>', { value: model.glasswool, text: 'Fjärrvärme' }));
    //$( "#heating" ).append($('<option>', { value: model.glasswool, text: 'Värmepump' }));
    //$( "#heating" ).append($('<option>', { value: model.glasswool, text: 'Flispanna' }));
    //$( "#heating" ).append($('<option>', { value: model.glasswool, text: 'Direktverkande el' }));

    //$("input[type='checkbox']" ).checkboxradio({icon: false});
    //$( "input[type='checkbox']").on( "change", refreshEcosystem );

    $( "#nr_floors" ).spinner({
            step: 1,
            spin: function( event, ui ) {
                        if ( ui.value > 20 ) {
                          $( this ).spinner( "value", 20 );
                          refreshBehavior();
                          return false;
                        } else if ( ui.value < 1 ) {
                          $( this ).spinner( "value", 1 );
                          refreshBehavior();
                          return false;
                        } else {
                          refreshBehavior();
                        }

            }
          });
    $( "#nr_floors" ).val(model.floors);

    $( "#floor_height" ).spinner({
            step: 0.1,
            spin: function( event, ui ) {
                      if ( ui.value > 4 ) {
                        $( this ).spinner( "value", 4 );
                        refreshBehavior();
                        return false;
                      } else if ( ui.value < 2.1 ) {
                            $( this ).spinner( "value", 2.1 );
                            refreshBehavior();
                        return false;
                      } else {
                        refreshBehavior();
                      }

          }
     });
    $( "#floor_height" ).val(model.floor_height);

    $( "#nr_basement" ).spinner({
           step: 1,
           spin: function( event, ui ) {
                     if ( ui.value > 0 ) {
                       $( this ).spinner( "value", 0 );
                       return false;
                     } else if ( ui.value < 0 ) {
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

    $( "#slider_m2" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 8000,
      value: model.planyta,
      slide: refreshBehavior,
      change: refreshBehavior
    });

    $( "#slider_takvinkel" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 45,
      value: model.roof_angle
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
      //model.tomtyta = $("#slider_tomtyta").slider("value");
      //model.gronyta = $("#slider_plant" ).slider("value");

      model.floors = $( "#nr_floors" ).val();
      model.floor_height = $( "#floor_height" ).val();

      model.foundation_material = $( "#grund" ).val();
      model.foundation_armering = $( "#grund_armering" ).val();
      model.foundation_iso = $( "#grund_iso" ).val();

      model.isolation_material_in = $( "#iso_in" ).val();
      model.window_percentage = $( "#slider_windows" ).slider("value");
      model.frame_material = $( "#stomme" ).val();

      model.facad_material_impact = $( "#fasad" ).val();
      model.roof_material_impact = $( "#roof_material" ).val();
      model.insidewalls_impact = $( "#innerv" ).val();
      model.insidefloor_impact = $( "#golv" ).val();
      model.window_material = $( "#windows" ).val();

      $( "#kvm_value" ).html("<p>PLANYTA: " + model.planyta + " kvm</p>" );
      $( "#kvm_tomt_value" ).html("<p>TOMTYTA: " + model.tomtyta + " kvm</p>" );
      $( "#window_text" ).html("<p>FÖNSTER: " + model.window_percentage + " % av yta</p>" );
      //$( "#info_grona_ytor" ).html("<p>"+ (model.tomtyta-model.planyta)*model.gronyta/100 +" kvm "+ model.gronyta + " % av tillgänglig yta.</p>");

      model.update();

};
function updateTotals(){
  $( "#m2_co2" ).html("<h1><nr>"+  model.co2_m2+"</nr><br/><cerulean> kg CO<sub>2</sub>/m2</cerulean></h1>");
  $( "#total_co2" ).html("<h1><nr>"+  Math.round(model.total_co2/1000)+"</nr><br/><cerulean> ton CO<sub>2</sub></cerulean></h1>");
  $( "#fasad_co2" ).html("<h3><fasad>KLIMATSKÄRM</fasad><br>"+  Math.round(model.shell_co2/1000)+ "ton CO<sub>2</sub></h3>");
  $( "#grund_co2" ).html("<h3><grund>GRUND</grund><br>"+  Math.round(model.foundation_co2/1000)+ " ton CO<sub>2</sub></h3>");
  $( "#stomme_co2" ).html("<h3><stomme>STOMME</stomme><br>"+  Math.round(model.stomme_co2/1000)+ " ton CO<sub>2</sub></h3>");
  $( "#inne_co2" ).html("<h3><inne>INSIDA</inne><br>"+  Math.round(model.inside_co2/1000)+ " ton CO<sub>2</sub></h2>");

  //$( "#greenfactor" ).html("<h1>"+ model.gyfactor+"</h1>");
  window.myDoughnut.data.datasets[0].data[0] = model.stomme_co2;
  window.myDoughnut.data.datasets[0].data[1] = model.foundation_co2;
  window.myDoughnut.data.datasets[0].data[2] = model.shell_co2;
  window.myDoughnut.data.datasets[0].data[3] = model.inside_co2;
  window.myDoughnut.update();

  //window.myChart2.data.datasets[0].data[0] = model.co2_m2;
  //window.myChart2.data.datasets[1].data[0] = 500-model.co2_m2;
  //window.myChart2.update();

  //refreshEcosystem();
};
model.addListener(updateTotals);
refreshBehavior();
};
