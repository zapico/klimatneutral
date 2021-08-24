window.onload = async function () {
  const model = new Model();

  $("input[type='checkbox']" ).checkboxradio({icon: false});
  $( "input[type='checkbox']").on( "change", refreshEcosystem );

  var $range = $(".ui-slider-range");
  $("#slider-children").slider({
    min: 0,
    max: 99,
    values: [10, 20, 25],
    classes: {
    "ui-slider-range": "highlight"},
    slide: function(event, ui) {
      $range.css('left', ui.values[0] + '%');
      $range.css('width', (ui.values[1] - ui.values[0]) + '%');
      if (!ui.handle.previousSibling) {
        if (ui.values[0] > ui.values[1]) {
          event.preventDefault();
          return;
        }

      } else if (ui.handle.nextSibling) {
        if (ui.values[1] < ui.values[0]) {
          event.preventDefault();
          return;
        }
      }
      refreshEcosystem();
    },
    create: function(event, ui) {
      var values = $(this).slider("values");
      $range.css('left', values[0] + '%');
      $range.css('width', (values[1] - values[0]) + '%');
    }
  });

  $( "#slider_tomtyta" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 50000,
    step: 100,
    value: model.tomtyta,
    slide: refreshEcosystem,
    change: refreshEcosystem
  } );
  $( "#slider_plant" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 100,
    value: model.gronyta,
    slide: refreshEcosystem,
    change: refreshEcosystem
  } );



  function refreshEcosystem(){
      valuesarr = $("#slider-children").slider("values");

      model.tomtyta = $("#slider_tomtyta").slider("value");
      model.planyta = valuesarr[0];
      model.hardyta = valuesarr[1];
      model.gronyta = valuesarr[2];
      model.tradyta = valuesarr[3];
      console.log(valuesarr);
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

      $( "#kvm_value" ).html("<p>BYGGDYTA:<br/> " + Math.round(model.tomtyta*model.planyta/100) + " kvm. " +model.planyta+ " %.</p>" );
      $( "#kvm_tomt_value" ).html("<p>TOMTYTA: " + model.tomtyta + " kvm</p>" );

      model.update();
  };

  function updateTotals(){
    $( "#info_grona_ytor" ).html("<p>GRÖNYTA:<br/> "+ Math.round((model.tomtyta-model.planyta)*model.gronyta/100) +" kvm "+ model.gronyta + " %</p>");
    $( "#greenfactor" ).html("<h2><fasad>GRÖNYTEFAKTOR</fasad></br><nr2>"+ model.gyfactor+" </nr2></h2>");
  }

  model.addListener(updateTotals);
  refreshEcosystem();
};
