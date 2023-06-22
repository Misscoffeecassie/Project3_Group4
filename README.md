# Is New South Wales heading towards net zero emissions?
Project 3_Group 4
Team members: Barani, Cassie, Henry, Keerthi, Sandhalie

## Deployment
* Here is a link to the dashboard: [NSW Emissions Dashboard](https://misscoffeecassie.github.io/Project3_Group4/templates/)

## Purpose
In this project, we are trying to answer the below questions:
* Which sectors are performing the best in terms of reducing carbon emissions?
* Which LGAs and sectors need more action to be able to reduce carbon emissions?
* In NSW what are the external factors that contribute to each type of emission?

## Data Sources and Inspiration
NSW Regional and local greenhouse gas emissions, 2016−2019 | dataset | seed (no date) NSW Regional and Local Greenhouse Gas Emissions, 2016−2019. Available at: https://datasets.seed.nsw.gov.au/dataset/nsw-regional-and-local-greenhouse-gas-emissions-2016-2019 (Accessed: 20 June 2023).  
Climate change - climate change (no date) Victorian Greenhouse Gas Emissions Report 2020. Available at: https://www.climatechange.vic.gov.au/__data/assets/pdf_file/0036/598257/Victorian-Greenhouse-Gas-Emissions-Report-2020.pdf (Accessed: 20 June 2023). 

## File Organization and Structure
* Located in the parent directory are four folders and the [emission.py](https://github.com/Misscoffeecassie/Project3_Group4/blob/main/emission.py) file.
* The [Resources](https://github.com/Misscoffeecassie/Project3_Group4/tree/main/Resources) folder contains the csv and the xlsx files that contains all the data.
* The [Workbooks](https://github.com/Misscoffeecassie/Project3_Group4/tree/main/Workbooks) folder contains a Jupyter file [Polygon_Requests.ipynb](https://github.com/Misscoffeecassie/Project3_Group4/blob/17946fe682ed9f142e3a2749319cfd9efb1f05fe/Workbooks/Polygon_Requests.ipynb) that connects to "https://asgs.linked.fsdf.org.au/dataset/asgsed3/collections/LGA2021/items/" and pulls out  list of coordinates for the borders of the LGAs and saves it as a csv.
* The [static](https://github.com/Misscoffeecassie/Project3_Group4/tree/main/static) folder contains the two javascript files [data.js](https://github.com/Misscoffeecassie/Project3_Group4/blob/17946fe682ed9f142e3a2749319cfd9efb1f05fe/static/data.js) and [script.js](https://github.com/Misscoffeecassie/Project3_Group4/blob/17946fe682ed9f142e3a2749319cfd9efb1f05fe/static/script.js) that were used to build the dashboard. The folder also contains the [style.css](https://github.com/Misscoffeecassie/Project3_Group4/blob/17946fe682ed9f142e3a2749319cfd9efb1f05fe/static/style.css) file used for customization of the dashboard.
* The [templates](https://github.com/Misscoffeecassie/Project3_Group4/tree/main/templates) folder contains a [css](https://github.com/tallantj95/belly-button-challenge/tree/main/assets/css) folder which houses the [styles.css](https://github.com/tallantj95/belly-button-challenge/blob/main/assets/css/styles.css) file used for customization of the dashboard.

## Tools and Technology
There are many tools and technologies used to create this web app. Some of them are listed below:

* [Flask](https://flask.palletsprojects.com/)
* [MongoDB](https://www.mongodb.com/)
* [SQL Alchemy](https://www.sqlalchemy.org/)
* [D3 JS](https://d3js.org/)
* [Plotly](https://plotly.com/javascript/)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [Select 2](https://select2.org/)
