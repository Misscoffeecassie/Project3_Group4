// Load JSON file
fetch('/Resources/Avg_Emissions.json')
  .then(response => response.json())
  .then(data => {

    // Generate series from JSON data
    var series = data.map(item => {
      return {
        name: item.Planning_Region,
        data: Object.keys(item).filter(key => key !== 'Planning_Region').map(key => {
          return {x: key, y: item[key]};
        })
      }
    });

    // Define the chart options
    var options = {
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      series: series,
      xaxis: {
        type: 'category',
      },
    };

    // Create the ApexCharts instance and render the chart
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

  })
  .catch(err => console.log(err));
