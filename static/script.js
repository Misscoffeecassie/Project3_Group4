

// ((2016 emissions - 2019 emissions) / 2016 emissions) * 100
// let search_year = 2016
// let search_lga = 'Albury';
search_lga = 'Albury'
search_sector = 'Agriculture'
d3.json("get_emission_progress/"+search_lga+"/"+search_sector).then(function(data) {
  console.log(data)
  build_radial(data,search_sector,search_lga);
  // data = {diff: 18, for_2016: 28780, for_2019: 23660}
  // diff -> ((2016 emissions - 2019 emissions) / 2016 emissions) * 100
  // for_2016 -> total emission for lga Albury ,sector Agriculture in 2016
  // for_2019 -> total emission for lga Albury ,sector Agriculture in 2019
});

function build_radial(data,search_sector,search_lga){

// RADIAL GAUGE
var radialChartOptions = {
  series: [data['for_2016'],data['for_2019'] ],
  chart: {
  height: 200,
  type: 'radialBar',
  toolbar: {
    show: true
  }
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
        hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '14px'
        },
        value: {
          formatter: function(val) {
            return parseInt(val);
          },
          color: '#111',
          fontSize: '36px',
          show: true,
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#ABE5A1'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Actual Percent', 'Target Percent'],
};
var radialChart = new ApexCharts(document.querySelector("#radial-chart"), radialChartOptions);
d3.select('#radial_title').text("LGA: "+search_lga + " Sector: "+search_sector)
radialChart.render();

}


