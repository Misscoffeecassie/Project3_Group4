d3.json("get_stationary_energy").then(function(data) {
   const stationary_energy_data = data;
    
});

d3.json("get_geo_data").then(function(data) {
   const geo_data_data = data;
    
   
});

d3.json("get_transport").then(function(data) {
   const transport_data = data;
    //console.log(data[1]);
   
});

d3.json("get_waste").then(function(data) {
    const waste_data = data;
    
   
});

d3.json("get_electricity_generation").then(function(data) {
    const electricity_generation_data = data;
    //console.log(data[1]);
  
});


d3.json("get_agriculture").then(function(data) {
    const agriculture_data = data;
    //console.log(data[1]);
   
});

d3.json("get_lulucf").then(function(data) {
    const lulucf_data = data;
    //console.log(data[1]);
   
});

d3.json("get_elec_consumption").then(function(data) {
    const elec_consumption_data = data;
    //console.log(data[1]);
   
});

d3.json("get_fugitive").then(function(data) {
    const fugitive_data = data;
    //console.log(data[1]);
   
});


