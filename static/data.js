
let search_sector;
let search_year = 2016
let search_lga = 'Albury';

//  json to build area chart
d3.json("get_all_year/"+search_lga).then(function(data) {
   organise_years_data(data,search_lga);
});

// json to build doughnut chart

d3.json("get_by_lga_year/"+search_lga+"/"+search_year).then(function(data) {
   build_doughnut(data,search_year,search_lga);
});


function build_doughnut(chart_data,yr,lga){
   
   let dataset = [];
   
   for (i=0;i<chart_data.length;i++){
      dataset.push({y:chart_data[i]['emission_amt'],label:chart_data[i]['_id']['Sector']})
   }
   
   var chart = new CanvasJS.Chart("doughnut_container", {
      animationEnabled: true,
      title:{
         text: "Co2 Emission(tonnes) for "+lga+" in "+yr,
         horizontalAlign: "left"
      },
      data: [{
         type: "doughnut",
         startAngle: 60,
         //innerRadius: 60,
         indexLabelFontSize: 17,
         indexLabel: "{label} - #percent%",
         toolTipContent: "<b>{label}:</b> {y} (#percent%)",
         dataPoints:dataset
      }]
   });
   chart.render();
}

// When LGA is changed
function optionChanged(value){
   // console.log(value)
   let search_year = d3.select("#select_year").property("value")
   let search_lga = value
   let search_sector = d3.select("#sector_selection").property("value")
   d3.json("get_all_year/"+value).then(function(data) {
      organise_years_data(data,search_lga);
   });
   
   // console.log(search_year)
   d3.json("get_by_lga_year/"+search_lga+"/"+search_year).then(function(data) {
      // console.log(data)
      build_doughnut(data,search_year,search_lga);
   });
   d3.json("get_emission_progress/"+search_lga+"/"+search_sector).then(function(data) {
      //console.log(data)
      build_radial(data,search_sector,search_lga);
    });
}

// When year is changed
function yearChanged(value){
   let search_lga = d3.select("#select_lga").property("value")
   let search_year = value
   d3.json("get_by_lga_year/"+search_lga+"/"+search_year).then(function(data) {
      // console.log(data)
      build_doughnut(data,search_year,search_lga);
   });
}

//  When sector is selected
function sectorChanged(value){
   let search_lga = d3.select("#select_lga").property("value")
   let search_sector = value
   d3.json("get_emission_progress/"+search_lga+"/"+search_sector).then(function(data) {
      console.log(data)
      build_radial(data,search_sector,search_lga);
   });
}

// Data prepe for stacked area chart Step 1
function organise_years_data(years_data,lga){
   // console.log(years_data)
   let y_16;
   let y_17;
   let y_18;
   let y_19;
   for (i=0;i<years_data.length;i++){
      // console.log(years_data[i][0][0])
      
      if(years_data[i][0][0]['Year'] == 2016){
         y_16 = years_data[i];   
      }
      if(years_data[i][0][0]['Year'] == 2017){
         y_17 = years_data[i];
      }
      if(years_data[i][0][0]['Year'] == 2018){
         y_18 = years_data[i];
      }
      if(years_data[i][0][0]['Year'] == 2019){
         y_19 = years_data[i];
      }
   }
   y_16 = frameYearData(y_16);
   y_17 = frameYearData(y_17);
   y_18 = frameYearData(y_18);
   y_19 = frameYearData(y_19);
   
   buildAreacChart(y_16,y_17,y_18,y_19,lga);
   
}

// Data prepe for stacked area chart Step 2
function frameYearData(y_data){
   single_year_data = []
   for (i=0;i<y_data.length;i++){
      e_data = y_data[i];
      temp_each_emission = {}
      temp_subsector = []
      // console.log(e_data)
      if (e_data.length > 0){

         emission_amount = 0
         for (j=0;j<e_data.length;j++){
            temp_each_emission.year = e_data[j]['Year']
            temp_each_emission.sector = e_data[j]['Sector']
            if(e_data[j]['SubSector1'] == '' || e_data[j]['Emissions_tonnes_CO2-e'] == '' ){
               e_data[j]['Emissions_tonnes_CO2-e'] = 0
            }
            emission_amount = emission_amount + e_data[j]['Emissions_tonnes_CO2-e']
            temp_subsector.push({'name':e_data[j]['SubSector1'],
            'value':e_data[j]['Emissions_tonnes_CO2-e']})
         } 
         temp_each_emission.subsector = temp_subsector;
         temp_each_emission.emission_amount = Math.round((emission_amount/e_data.length));
      }
      single_year_data.push(temp_each_emission);
   }
   return single_year_data
}

//  OCde to build Stacked area chart
function buildAreacChart(x16,x17,x18,x19,lga){
   x = [x16,x17,x18,x19];
   //console.log(x16)

   datapoint_elecCon = [];
   datapoint_luluf = [];
   datapoint_electGen = [];
   datapoint_waste = [];
   datapoint_trans = [];
   datapoint_statEng = [];
   datapoint_agri = [];
   datapoint_fug = [];
   for (i=0;i<x16.length;i++){
      if (x16[i]['sector'] == 'Electricity Consumption - Scope 2')
      {
         datapoint_elecCon.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_elecCon.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_elecCon.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_elecCon.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      if (x16[i]['sector'] == "Agriculture")
      {
         datapoint_agri.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_agri.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_agri.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_agri.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      if (x16[i]['sector'] == "Fugitive Emissions")
      {
         datapoint_fug.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_fug.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_fug.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_fug.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      if (x16[i]['sector'] == "Land Use, Land Use Change and Forestry")
      {
         datapoint_luluf.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_luluf.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_luluf.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_luluf.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      if (x16[i]['sector'] == "Electricity Generation")
      {
         datapoint_electGen.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_electGen.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_electGen.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_electGen.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      if (x16[i]['sector'] == "Waste")
      {
         datapoint_waste.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_waste.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_waste.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_waste.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      if (x16[i]['sector'] == "Transport")
      {
         datapoint_trans.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_trans.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_trans.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_trans.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      if (x16[i]['sector'] =="Stationary Energy (excluding Electricity Generation)"){
         datapoint_statEng.push({x:x16[i]['year'],y:x16[i]['emission_amount']})
         datapoint_statEng.push({x:x17[i]['year'],y:x17[i]['emission_amount']})
         datapoint_statEng.push({x:x18[i]['year'],y:x18[i]['emission_amount']})
         datapoint_statEng.push({x:x19[i]['year'],y:x19[i]['emission_amount']})
      }
      
   }
   //console.log(datapoint_fug)
   var chart = new CanvasJS.Chart("chartContainer", {
      	animationEnabled: true,
      	title:{
      		text: "LGA "+lga
      	},
         theme:"light2",
      	axisY :{
            title: "Co2 Emissoin in tonnes",
      		valueFormatString: "#0,.",
      		suffix: "k"
      	},
      	axisX: {
      		title: "Observed Years (2016,2017,2018,2019)",
            interval: 1,
		      intervalType: "year",
            minimum:2016,
            maximum:2019
      	},
      	toolTip: {
      		shared: true
      	},
         
      	data: [{        
      		type: "stackedArea",
      		showInLegend: true,
            markerSize: 0,
            color: "#3333ff",
      		toolTipContent: "<span style=\"color:#3333ff\"><strong>{name}: </strong></span> {y}<br>",
      		name: "Electricity Consumptions",
      		dataPoints:datapoint_elecCon
      	},
      	{        
      		type: "stackedArea",  
      		name: "Agriculture",
            color:"#47d147",
      		toolTipContent: "<span style=\"color:#47d147\"><strong>{name}: </strong></span> {y}<br>",
      		showInLegend: true,
      		dataPoints: datapoint_agri
      	},
         {        
      		type: "stackedArea",  
      		name: "Fugitive Emissions",
            color:"#33ccff",
      		toolTipContent: "<span style=\"color:#33ccff\"><strong>{name}: </strong></span> {y}<br>",
      		showInLegend: true,
      		dataPoints: datapoint_fug
      	},
         {        
      		type: "stackedArea",  
      		name: "Forest Land Usage",
            color:" #439966",
      		toolTipContent: "<span style=\"color:#439966\"><strong>{name}: </strong></span> {y}<br>",
      		showInLegend: true,
      		dataPoints: datapoint_luluf
      	},
         {        
      		type: "stackedArea",  
      		name: "Electricity Generation",
            color:"#ffaa00",
      		toolTipContent: "<span style=\"color:#ffaa00\"><strong>{name}: </strong></span> {y}<br>",
      		showInLegend: true,
      		dataPoints: datapoint_electGen
      	},
         {
            type: "stackedArea",  
      		name: "Waste",
            color:"#993333",
      		toolTipContent: "<span style=\"color:#993333\"><strong>{name}: </strong></span> {y}<br>",
      		showInLegend: true,
      		dataPoints: datapoint_waste
         },
         {
            type: "stackedArea",  
      		name: "Transport",
            color:"#ff1a66",
      		toolTipContent: "<span style=\"color:#ff1a66\"><strong>{name}: </strong></span> {y}<br>",
      		showInLegend: true,
      		dataPoints: datapoint_trans
         },
         {
            type: "stackedArea",  
      		name: "Stationary Energy",
            color:"#661aff",
      		toolTipContent: "<span style=\"color:#661aff\"><strong>{name}: </strong></span> {y}<br>",
      		showInLegend: true,
      		dataPoints: datapoint_statEng
         }
      ]
      });
      chart.render();
}

