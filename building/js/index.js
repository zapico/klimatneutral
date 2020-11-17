$( function() {
  $( "#accordion" ).accordion({
    collapsible: true,
    heightStyle: "content"
  });
    $( "input" ).checkboxradio({
      icon: false
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

    $( "#slider_m2" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 10000,
    value: 2
  } );

  $( "#slider_takvinkel" ).slider({
  orientation: "horizontal",
  range: "min",
  max: 45,
  value: 0
} );

  } );

  var config = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          223.391+282.607,
          32.817,
          4.635,
          13.670+122.020+22.110+22.027+2.222
        ],
        backgroundColor: [
          window.chartColors.red,
          window.chartColors.orange,
          window.chartColors.yellow,
          window.chartColors.green,
          window.chartColors.blue,
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Betong',
        'Transporter',
        'Installationer',
        'Fasad'
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
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


  window.onload = function() {
    var ctx = document.getElementById('chart-area').getContext('2d');
    window.myDoughnut = new Chart(ctx, config);
  };
