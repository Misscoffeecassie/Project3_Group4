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

// KKC - added to set the options in the dropdown lists for Year, LGA and Emission Source
var Year = "All";
var LGA = "All";
var Sector = "All";
var barData = {};
var maxBarX = 0;
var barX;
var barY;
var barWidth = 800;
var barHeight = 600;
var barWidth2 = 1200;
var barHeight2 = 1200;
var barMargin = {top: 50, bottom: 100, left: 50, right: 50}


d3.select("#Years").selectAll("*").remove();
d3.json("http://localhost:5000/getYears").then(function(data) {
    YearOptions = d3.select("#Years");
    YearOptions.append('option').text('All');
    for (i = 0; i< data.length; i++) {
        if (Year == "") {
            console.log(data[i])
            Year = data[i];
            YearOptions.append('option')
            .attr('selected', '').text(data[i]);
        } 
        else if (Year == data[i]) {
            YearOptions.append('option')
            .attr('selected', '')
            .text(data[i]);
        } 
        else {
            YearOptions.append('option')
            .text(data[i]);
        }
    }
});

d3.select("#LGAs").selectAll("*").remove();
d3.json("http://localhost:5000/getLGAs").then(function(data) {
    LGAOptions = d3.select("#LGAs");
    LGAOptions.append('option').text('All');
    for (i = 0; i< data.length; i++) {
        if (LGA == "") {
            console.log(data[i])
            LGA = data[i];
            LGAOptions.append('option')
            .attr('selected', '').text(data[i]);
        } 
        else if (LGA == data[i]) {
            LGAOptions.append('option')
            .attr('selected', '').text(data[i]);
        } 
        else {
            LGAOptions.append('option')
            .text(data[i]);
        }
    }
});

d3.select("#Sectors").selectAll("*").remove();
d3.json("http://localhost:5000/getSectors").then(function(data) {
    SectorOptions = d3.select("#Sectors");
    SectorOptions.append('option').text('All');
    for (i = 0; i< data.length; i++) {
        if (Sector == "") {
            console.log(data[i])
            Sector = data[i];
            SectorOptions.append('option').attr('selected', '').text(data[i]);
        } 
        else if (Sector == data[i]) {
            SectorOptions.append('option').attr('selected', '').text(data[i]);
        } 
        else {
            SectorOptions.append('option').text(data[i]);
        }
    }
});

var bar = d3.select("#new-chart1")
.append('svg')
.attr('id', 'svg1')
.attr('height', barHeight - barMargin.top - barMargin.bottom)
.attr('width', barWidth - barMargin.left - barMargin.right)
.attr('viewBox', [0, 0, barWidth, barHeight])
.append('g')
.attr('id', 'svg1g1')
.attr('fill', "blue")
.attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");


var bar = d3.select("#new-chart2")
.append('svg')
.attr('id', 'svg2')
.attr('height', barHeight2 - barMargin.top - barMargin.bottom)
.attr('width', barWidth2 - barMargin.left - barMargin.right)
.attr('viewBox', [0, 0, barWidth2, barHeight2])
.append('g')
.attr('id', 'svg2g1')
.attr('fill', "blue")
.attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");


var bar = d3.select("#new-chart3")
.append('svg')
.attr('id', 'svg3')
.attr('height', barHeight - barMargin.top - barMargin.bottom)
.attr('width', barWidth - barMargin.left - barMargin.right)
.attr('viewBox', [0, 0, barWidth, barHeight])
.append('g')
.attr('id', 'svg3g1')
.attr('fill', "blue")
.attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");


newBarData();
// newSecData();

function newYear() {
    Year = document.getElementById("Years").value;
    console.log(Year)
    newBarData()
    // newSecData();
    return;
};

function newLGA() {
    LGA = document.getElementById("LGAs").value;
    console.log(LGA)
    newBarData()
    // newSecData();
    return;
};

function newSector() {
    Sector = document.getElementById("Sectors").value;
    console.log(Sector)
    newBarData()
    // newSecData();
    return;
};

function xBarAxis(g) {
    console.log('xBarAxis')
    console.log(barData)
    g.attr('transform', `translate(0, ${barHeight - barMargin.bottom})`).call(d3.axisBottom(barX).scale(barX)
        .ticks(null, barData.format));
};

function xBarAxis2(g) {
    console.log('xBarAxis')
    console.log(barData)
    g.attr('transform', `translate(0, ${barHeight2 - barMargin.bottom})`).call(d3.axisBottom(barX).scale(barX)
        .ticks(null, barData.format));
};

function yBarAxis(g) {
    g.attr('transform', `translate(${barMargin.left}, 0)`).call(d3.axisLeft(barY).ticks(null, barData.format));
};


function newBarData() {
    console.log(LGA, Sector)
    d3.json("get_Year_data/" + LGA + "/" + Sector).then(function(data) {
        console.log(data);

        minBarX = 0;
        maxBarX = 0;
        barData = {};
        for (i = 0; i < data.length; i++) {
            barData[data[i]["_id"]] = data[i]["totalEmission"];
        }
        minBarX = d3.min(Object.values(barData));
        maxBarX = d3.max(Object.values(barData));
        console.log(minBarX, maxBarX, barData);


        d3.select("#title1").text("Emission by Year for LGA(" + LGA + ")/Emission Sector(" + Sector + ")");
        var color = d3.scaleOrdinal()
        .domain(Object.keys(barData))
        .range(d3.schemeDark2);

        var g1 = d3.select("#svg1g1");
        g1.remove();
     
        if (minBarX < 0) {
            barX = d3.scaleLinear()
            .domain([minBarX, maxBarX])
            .range([barMargin.left, barWidth - barMargin.right]); 
            console.log("negative minimum")
        } else {
            barX = d3.scaleLinear()
            .domain([0, maxBarX])
            .range([barMargin.left, barWidth - barMargin.right]); 
            console.log("zero minimum")
        }
        
        barY = d3.scaleBand()
        .domain(data.map(function(d) {return d._id;}))
        .range([barMargin.top, barHeight - barMargin.bottom])
        .padding(0.1);

        d3.select("#svg1")
        .append('g')
        .attr('id', 'svg1g1').attr('fill', "orange")
        .attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");

        g1 = d3.select("#svg1g1");

        if (minBarX < 0) {
            g1.selectAll('rect')
            .data(data)
            .join('rect')
            .attr("class", function(d) { return d.totalEmission < 0 ? "bar negative" : "bar positive"; })
            .attr('x',function (d) { return barX(Math.min(0, d.totalEmission)); })
            .attr('y', function(d) { return barY(d._id);})        
            .attr('height', barY.bandwidth())        
            .attr('width',  function(d) { return Math.abs(barX(d.totalEmission) - barX(0));})
            .attr('fill', d => color(d._id));
        } else {
            g1.selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x',barX(0))
            .attr('y', function(d) { return barY(d._id);})        
            .attr('height', barY.bandwidth())        
            .attr('width',  function(d) { return barX(d.totalEmission);})
            .attr('fill', d => color(d._id));
        }
        
        g1.append('g')
        .call(xBarAxis);
        
        g1.append('g')
        .call(yBarAxis);
        
        g1.node();   
    });

    d3.json("get_LGA_data/" + Year + "/" + Sector).then(function(data) {
        console.log(data);

        minBarX = 0;
        maxBarX = 0;
        barData = {};
        for (i = 0; i < data.length; i++) {
            barData[data[i]["_id"]] = data[i]["totalEmission"];
        }
        minBarX = d3.min(Object.values(barData));
        maxBarX = d3.max(Object.values(barData));
        console.log(minBarX, maxBarX, barData);

        d3.select("#title2").text("Emission by LGA for Year(" + Year + ")/Emission Sector(" + Sector + ")");
        var color = d3.scaleOrdinal()
        .domain(Object.keys(barData))
        .range(d3.schemeDark2);

        var g1 = d3.select("#svg2g1");
        g1.remove();
     
        if (minBarX < 0) {
            barX = d3.scaleLinear()
            .domain([minBarX, maxBarX])
            .range([barMargin.left, barWidth2 - barMargin.right]); 
            console.log("negative minimum")
        } else {
            barX = d3.scaleLinear()
            .domain([0, maxBarX])
            .range([barMargin.left, barWidth2 - barMargin.right]); 
            console.log("zero minimum")
        }
        
        barY = d3.scaleBand()
        .domain(data.map(function(d) {return d._id;}))
        .range([barMargin.top, barHeight2 - barMargin.bottom]).padding(0.1);

        d3.select("#svg2")
        .append('g')
        .attr('id', 'svg2g1')
        .attr('fill', "orange")
        .attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");

        g1 = d3.select("#svg2g1");

        if (minBarX < 0) {
            g1.selectAll('rect').data(data)
            .join('rect')
            .attr("class", function(d) { return d.totalEmmission < 0 ? "bar negative" : "bar positive"; })
            .attr('x',function (d) { return barX(Math.min(0, d.totalEmission)); })
            .attr('y', function(d) { return barY(d._id);})        
            .attr('height', barY.bandwidth())        
            .attr('width',  function(d) { return Math.abs(barX(d.totalEmission) - barX(0));})
            .attr('fill', d => color(d._id));
        } else {
            g1.selectAll('rect').data(data)
            .join('rect').attr('x',barX(0))
            .attr('x',barX(0))
            .attr('y', function(d) { return barY(d._id);})        
            .attr('height', barY.bandwidth())        
            .attr('width',  function(d) { return barX(d.totalEmission);})
            .attr('fill', d => color(d._id));
        }
        
        g1.append('g')
        .call(xBarAxis2);

        g1.append('g')
        .call(yBarAxis);

        g1.node();   
    })
    d3.json("get_Sector_data/" + Year + "/" + LGA).then(function(data) {
        console.log(data);

        minBarX = 0;
        maxBarX = 0;
        barData = {};
        for (i = 0; i < data.length; i++) {
            barData[data[i]["_id"]] = data[i]["totalEmission"];
        }
        minBarX = d3.min(Object.values(barData));
        maxBarX = d3.max(Object.values(barData));
        console.log(minBarX, maxBarX, barData);

        d3.select("#title3").text("Emission by Emission Sector for Year(" + Year + ")/LGA(" + LGA + ")");
        var color = d3.scaleOrdinal()
        .domain(Object.keys(barData))
        .range(d3.schemeDark2);

        var g1 = d3.select("#svg3g1");

        g1.remove();
     
        if (minBarX < 0) {
            barX = d3.scaleLinear()
            .domain([minBarX, maxBarX])
            .range([barMargin.left, barWidth - barMargin.right]); 
            console.log("negative minimum")
        } else {
            barX = d3.scaleLinear()
            .domain([0, maxBarX])
            .range([barMargin.left, barWidth - barMargin.right]); 
            console.log("zero minimum")
        }

        barY = d3.scaleBand()
        .domain(data.map(function(d) {return d._id;}))
        .range([barMargin.top, barHeight - barMargin.bottom])
        .padding(0.1);

        d3.select("#svg3")
        .append('g').attr('id', 'svg3g1')
        .attr('fill', "orange")
        .attr("transform", "translate(" + barMargin.left + ", " + barMargin.top + ")");

        g1 = d3.select("#svg3g1");

        if (minBarX < 0) {
            g1.selectAll('rect')
            .data(data)
            .join('rect')
            .attr("class", function(d) { return d.totalEmission < 0 ? "bar negative" : "bar positive"; })
            .attr('x',function (d) { return barX(Math.min(0, d.totalEmission)); })
            .attr('y', function(d) { return barY(d._id);})        
            .attr('height', barY.bandwidth())        
            .attr('width',  function(d) { return Math.abs(barX(d.totalEmission) - barX(0));})
            .attr('fill', d => color(d._id));
        } else {
            g1.selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x',barX(0))
            .attr('y', function(d) { return barY(d._id);})        
            .attr('height', barY.bandwidth())        
            .attr('width',  function(d) { return barX(d.totalEmission);})
            .attr('fill', d => color(d._id));
        }

        g1.append('g')
        .call(xBarAxis);

        g1.append('g')
        .call(yBarAxis);

        g1.node();   
    })
};




//Chart_6


//Chart_7
var svg = d3.select("#new-chart7")
  .append("svg")
  .attr('id', 'svg7')
  .attr("width", 500)
  .attr("height", 500)
  .append("g")
  .attr("id", "svg7g1")
  .attr("transform", `translate(${500/2},${500/2})`);


function newSecData() {
  console.log(LGA, Sector)
  d3.json("get_Sector_data/" + Year + "/" + LGA).then(function(data2) {
      
  console.log(data2);
  var data3 = {}
  for (i = 0; i < data2.length; i++) {
      data3[data2[i]['_id']] = data2[i]['totalEmission']
  }

  console.log(data3);

  d3.select("#title7").text("Emission by Emission Sector for Year(" + Year + ")/LGA(" + LGA + ")");

  var g1 = d3.select("#svg7g1");
  g1.remove();
   
  svg = d3.select("#svg7")
  .append('g')
  .attr('id', 'svg7g1')
  .attr("transform", `translate(${500/2},${500/2})`);

  var r = Math.min(500, 500) / 2 - 50

  console.log(Object.keys(data3))

  var color = d3.scaleOrdinal()
  .domain(Object.keys(data3))
  .range(d3.schemeDark2);

  var pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(d => d[1])

  var data_ready = pie(Object.entries(data3))
   
  console.log(data_ready);
  
    // The arc generator
    var arc = d3.arc()
      .innerRadius(r * 0.5)         // This is the size of the donut hole
      .outerRadius(r * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3.arc()
      .innerRadius(r * 0.9)
      .outerRadius(r * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .join('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[1]))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Add the polylines between chart and labels:
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .join('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
          const posA = arc.centroid(d) // line insertion in the slice
          const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          const posC = outerArc.centroid(d); // Label position = almost the same as posB
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = r * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        })

    // Add the polylines between chart and labels:
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .join('text')
        .text(d => d.data[0])
        .attr('transform', function(d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = r * 0.99 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
        })
        .style('text-anchor', function(d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })
  });
} 


//* KKC Added End *//

// KKC - end of added

// ---------- CHARTS ----------

// BAR CHART
var barChartOptions = {
  series: [{
    data: [10, 8, 6, 4, 2]
  }],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false
    },
  },
  colors: [
    "#246dec",
    "#cc3c43",
    "#367952",
    "#f5b74f",
    "#4f35a1"
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: ["Laptop", "Phone", "Monitor", "Headphones", "Camera"],
  },
  yaxis: {
    title: {
      text: "Count"
    }
  }
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
//barChart.render();



// AREA CHART
var areaChartOptions = {
  series: [{
    name: 'Purchase Orders',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'Sales Orders',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: 'Purchase Orders',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales Orders',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  }
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
//areaChart.render();

