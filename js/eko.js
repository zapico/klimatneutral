window.onload = async function () {
  const model = new Model();


  $("input[type='checkbox']" ).checkboxradio({icon: false});
  $( "input[type='checkbox']").on( "change", refreshEcosystem );

  $( "#slider_tomtyta" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 50000,
    step: 100,
    value: model.tomtyta,
    slide: refreshEcosystem,
    change: refreshEcosystem
  } );
  $( "#slider_byggdyta" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 100,
    value: model.planyta,
    slide: refreshEcosystem,
    change: refreshEcosystem
  } );
  $( "#slider_gronyta" ).slider({
       range: true,
       min: 0,
       max: 100,
       values: [ 10, 90 ],
       slide: refreshEcosystem
     });



 function refreshEcosystem(){
      valuesarr = $("#slider_gronyta").slider("values");

      model.tomtyta = $("#slider_tomtyta").slider("value");
      model.planyta = $("#slider_byggdyta").slider("value");
      model.hardyta = valuesarr[0];
      model.gronyta = valuesarr[1]-valuesarr[0];
      model.grusyta = 100-valuesarr[1]

      var et_1 = 0.1;
      var et_2 = 0.1;
      var et_3 = 0.1;
      var et_4 = 0.1;
      if ($( "#checkbox-damm" ).is(":checked")) { et_2 += 0.4; };
      if ($( "#checkbox-frukt" ).is(":checked")) { et_1 += 0.4; et_3 += 0.4; };
      if ($( "#checkbox-bi" ).is(":checked")) { et_1 += 0.4; };
      if ($( "#checkbox-motion" ).is(":checked")) { et_4 += 0.4; };
      if ($( "#checkbox-keep" ).is(":checked")) { et_1 += 0.4; et_2 += 0.4;};
      if ($( "#checkbox-solpaneller" ).is(":checked")) { et_3 += 0.4;};
      if ($( "#checkbox-sedum" ).is(":checked")) { et_2 += 0.3;};
      if ($( "#checkbox-lekplats" ).is(":checked")) {et_4 += 0.4;};
      if (model.gyfactor >= 0.2) {
        et_1 += 0.3;
        et_2 += 0.5;
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

      built = Math.round(model.tomtyta*model.planyta/100)
      unbuilt = model.tomtyta - built
      unbuilt_per = 100-model.planyta

      $( "#kvm_bygd_value" ).html("<p>BYGGDYTA:<br/> " + built + " kvm. " + model.planyta+ " %.</p>" );
      $( "#kvm_tomt_value" ).html("<p>TOMTYTA:<br/> " + model.tomtyta + " kvm</p>" );
      $( "#kvm_land_value" ).html("<p>LANDSKAPSYTA:<br/> " + unbuilt + " kvm" + unbuilt_per + "%.</p>" );
      $( "#kvm_gron_value" ).html("<p> HÅRDYTA: " + model.hardyta+ " % | GRÖNYTA: " + model.gronyta+ " %. | GRUS: " + model.grusyta+ " %</p>" );

      model.update();
  };

  function updateTotals(){
    $( "#greenfactor" ).html("<h2><fasad>GRÖNYTEFAKTOR</fasad></br><nr2>"+ model.gyfactor+" </nr2></h2>");
  }

  model.addListener(updateTotals);
  refreshEcosystem();
};
