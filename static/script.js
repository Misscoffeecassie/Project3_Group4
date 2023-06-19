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

//* KKC Added *//

// ---------- SELECTIONS ---------
function newYear() {
    var selectedYear = document.getElementById("selectedYear").value;
    document.location.href = "/newSelection/year/" + selectedYear;
    return;
}

function newLGA() {
    var selectedLGA = document.getElementById("selectedLGA").value;
    document.location.href = "/newSelection/LGA/" + selectedLGA;
    return;
}

function newEmission() {
    var selectedEmission = document.getElementById("selectedEmission").value;
    document.location.href = "/newSelection/Emission/" + selectedEmission;
    return;
}

function newEmissionSubCat() {
    var selectedEmissionSubCat = document.getElementById("selectedEmissionSubCat").value;
    document.location.href = "/newSelection/EmissionSubCat/" + selectedEmissionSubCat;
    return;
}


//* KKC Added End *//


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
barChart.render();



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
areaChart.render();

//* KKC Added *//
//* KKC - yet to be done - choos an ApexChart chart type and add code here *//
var KK_emissions = KK_Data;
var KK_BarchartOptions = barChartOptions;
KK_BarchartOptions["series"][0]["data"] = KK_emissions;
var KK_Chart = new ApexCharts(document.querySelector("#KK_Chart"), KK_BarchartOptions);
KK_Chart.render();

//* KKC Added End *//