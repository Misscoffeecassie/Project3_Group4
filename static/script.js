// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}


// RADIAL GAUGE
var radialChartOptions = {
  series: [3.03, 26.67],
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
radialChart.render();

// // KKC - added to set the options in the dropdown lists for Year, LGA and Emission Source
// var Year = "All";
// var LGA = "All";
// var Sector = "All";
// var barData = []
// var maxBarX = 0;
// var barX;
// var barY;
// var barWidth = 800;
// var barHeight = 600;
// var barWidth2 = 1200;
// var barHeight2 = 600;
// var barMargin = {top: 50, bottom: 100, left: 50, right: 50}

// d3.select("#Years").selectAll("*").remove();
// d3.json("getYears").then(function(data) {
//     YearOptions = d3.select("#Years");
//     YearOptions.append('option').text('All');
//     for (i = 0; i< data.length; i++) {
//         if (Year == "") {
//             console.log(data[i])
//             Year = data[i];
//             YearOptions.append('option')
//             .attr('selected', '').text(data[i]);
//         } 
//         else if (Year == data[i]) {
//             YearOptions.append('option')
//             .attr('selected', '')
//             .text(data[i]);
//         } 
//         else {
//             YearOptions.append('option')
//             .text(data[i]);
//         }
//     }
// });

// d3.select("#LGAs").selectAll("*").remove();
// d3.json("getLGAs").then(function(data) {
//     LGAOptions = d3.select("#LGAs");
//     LGAOptions.append('option').text('All');
//     for (i = 0; i< data.length; i++) {
//         if (LGA == "") {
//             console.log(data[i])
//             LGA = data[i];
//             LGAOptions.append('option')
//             .attr('selected', '').text(data[i]);
//         } 
//         else if (LGA == data[i]) {
//             LGAOptions.append('option')
//             .attr('selected', '').text(data[i]);
//         } 
//         else {
//             LGAOptions.append('option')
//             .text(data[i]);
//         }
//     }
// });

// d3.select("#Sectors").selectAll("*").remove();
// d3.json("getSectors").then(function(data) {
//     SectorOptions = d3.select("#Sectors");
//     SectorOptions.append('option').text('All');
//     for (i = 0; i< data.length; i++) {
//         if (Sector == "") {
//             console.log(data[i])
//             Sector = data[i];
//             SectorOptions.append('option').attr('selected', '').text(data[i]);
//         } 
//         else if (Sector == data[i]) {
//             SectorOptions.append('option').attr('selected', '').text(data[i]);
//         } 
//         else {
//             SectorOptions.append('option').text(data[i]);
//         }
//     }
// });

// var bar = d3.select("#new-chart1")
// .append('svg')
// .attr('id', 'svg1')
// .attr('height', barHeight - barMargin.top - barMargin.bottom)
// .attr('width', barWidth - barMargin.left - barMargin.right)
// .attr('viewBox', [0, 0, barWidth, barHeight])
// .append('g')
// .attr('id', 'svg1g1')
// .attr('fill', "blue")
// .attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");


// var bar = d3.select("#new-chart2")
// .append('svg')
// .attr('id', 'svg2')
// .attr('height', barHeight - barMargin.top - barMargin.bottom)
// .attr('width', barWidth - barMargin.left - barMargin.right)
// .attr('viewBox', [0, 0, barWidth, barHeight])
// .append('g')
// .attr('id', 'svg2g1')
// .attr('fill', "blue")
// .attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");


// var bar = d3.select("#new-chart3")
// .append('svg')
// .attr('id', 'svg3')
// .attr('height', barHeight - barMargin.top - barMargin.bottom)
// .attr('width', barWidth - barMargin.left - barMargin.right)
// .attr('viewBox', [0, 0, barWidth, barHeight])
// .append('g')
// .attr('id', 'svg3g1')
// .attr('fill', "blue")
// .attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");

// Bottom lines are from Kristy's code that doesn't merge with ours currently, still working on connecting this.