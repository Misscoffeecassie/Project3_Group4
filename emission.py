# Import dependencies
from pymongo import MongoClient
from pprint import pprint
from flask import Flask, jsonify,render_template,Response
import json
from bson import json_util

# Create an instance of MongoClient
mongo = MongoClient(port=27017)

# confirm that our new database was created
# print(mongo.list_database_names())

# assign the met database to a variable name
db = mongo['greenhouse_emission']

# review the collections in our new database
# pprint(db.list_collection_names())

# assign the collections to a variable
electricity_consumption = db['electricity_consumption']
fugitive = db['fugitive']
lulucf = db['lulucf']
ippu = db['ippu']
agriculture = db['agriculture']
electricity_generation = db['electricity_generation']
waste = db['waste']
transport = db['transport']
stationary_energy = db['stationary_energy']
geo_data = db['geo_data']
combined = db['combined']
geo_data_lga = db['geo_data_lga']

app = Flask(__name__)

# Landing Page
@app.route("/")
def index():
    return render_template("index.html")

# Bar Chart 
@app.route("/barchart")
def barchart():
    return render_template("barchart.html")



# Extract query results & josnification
def find_all(query_result):
    temp_list = []
    for row in query_result:
       temp_list.append(row)
    json_variables = json.dumps(temp_list,default=json_util.default)
    return json_variables 

# Build geodata for each sector
def buildGeodata(sec_data):
    unset_emmision_value = {'$set':{'properties.emission_amt':0}}
    geo_data.update_many({},unset_emmision_value)
    for i in range(len(sec_data)):
        query = {'id':sec_data[i]['_id']['LGA']}
        new_prop = {'$set':{'properties.emission_amt':sec_data[i]['emission_amt']}}
        geo_data.update_one(query,new_prop)
    results = geo_data.find({})
    return results

agri ='Agriculture'
elec_cons ='Electricity Consumption - Scope 2'
fugi ='Fugitive Emissions'
land_use ='Land Use, Land Use Change and Forestry'
elec_gen ='Electricity Generation'
wte ='Waste'
trans ='Transport'
stat_eng ='Stationary Energy (excluding Electricity Generation)'


# Build doghnut chart

@app.route("/get_by_lga_year/<lga>/<year>",methods=['GET'])
def get_by_lga_year(lga,year):
    lag = str(lga).strip()
    year = int(year)
    sector_data =list(combined.aggregate([

            {'$match':{ '$and':[ {'Year':year},{'LGA':lga}] }},
            {'$group': {'_id': {"Sector": "$Sector"},'emission_amt':{'$sum':"$Emissions_tonnes_CO2-e"}}},
            {'$sort':{'emission_amt':-1}}
            ]))
    # print([sector_data])
    return (find_all(sector_data))
    
   
 

# Code to build stacked area chart
@app.route("/get_all_year/<lga>",methods=['GET'])
def get_all_year(lga):
    years = [2016,2017,2018,2019]
    sectors = [agri,elec_cons,fugi,land_use,elec_gen,wte,trans,stat_eng]
   
    year_by_data = []
    for y in range(len(years)):
        sector_by_data = []
        for i in range(len(sectors)):
            templist = []
            query = {'Year':int(years[y]),'LGA':lga,'Sector':sectors[i]}
            fields = {'Emissions_tonnes_CO2-e':1,'LGA':1,'LGA_CODE18':1,'Sector':1,'SubSector1':1,'Year':1}
            results = combined.find(query,fields)
            for row in results:
                templist.append(row)
            sector_by_data.append(templist)
        year_by_data.append(sector_by_data)
    json_variables = json.dumps(year_by_data,default=json_util.default)
    return json_variables

   
# Data for Radial chart
@app.route("/get_emission_progress/<lga>/<sector>",methods=['GET'])
def get_by_year(lga,sector):
    # lga = 'Albury'
    # sector = 'Waste'
    lga = str(lga).strip()
    sector = str(sector).strip()
    progress = 0
    lga_2016_data =list(combined.aggregate([

            {'$match':{ '$and':[ {'Year':2016},{'LGA':lga},{'Sector':sector}] }},
            {'$group': {'_id': {"Sector": "$Sector"},'emission_amt':{'$sum':"$Emissions_tonnes_CO2-e"}}},
            {'$sort':{'emission_amt':-1}}
            ]))
    lga_2019_data =list(combined.aggregate([

            {'$match':{ '$and':[ {'Year':2019},{'LGA':lga},{'Sector':sector}] }},
            {'$group': {'_id': {"Sector": "$Sector"},'emission_amt':{'$sum':"$Emissions_tonnes_CO2-e"}}},
            {'$sort':{'emission_amt':-1}}
            ]))
    
    # json_variables = json.dumps(temp_list,default=json_util.default)
    if len(lga_2019_data):
        progress = ((lga_2016_data[0]['emission_amt'] - lga_2019_data[0]['emission_amt']) / lga_2016_data[0]['emission_amt'])*100
        progress_data = {
            'lga':lga,
            'sector':sector,
            'for_2016':lga_2016_data[0]['emission_amt'] ,
            'for_2019':lga_2019_data[0]['emission_amt'],
            'diff':round(progress)
        }
    else:
        progress_data = {
            'lga':lga,
            'sector':sector,
            'for_2016':0,
            'for_2019':0,
            'diff':round(progress)
        }
    return (jsonify(progress_data))


## KKC - added ##
@app.route("/getYears",methods=['GET'])
def get_Years():
 # Fetch the list of years from the database
    results = combined.distinct('Year')
    return find_all(results)

@app.route("/getLGAs",methods=['GET'])
def get_LGAs():
 # Fetch the list of years from the database
    results = combined.distinct('LGA')
    return find_all(results)

@app.route("/getSectors",methods=['GET'])
def get_Sectors():
 # Fetch the list of years from the database
    results = combined.distinct('Sector')
    return find_all(results)

@app.route("/get_Year_data/<LGA>/<Sector>",methods=['GET'])
def get_Year_data(LGA, Sector):
 # Fetch the date for this LGA/Sector combination
    if LGA == 'All':
        if Sector == 'All':
            aggs = [
                    { "$group": { "_id": "$Year", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                    },
                    { "$sort": { "_id": 1}
                    }
                   ]
        else:
            aggs = [
                    { "$match":{ "Sector": Sector }
                    },
                    { "$group": { "_id": "$Year", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                    },
                    { "$sort": { "_id": 1}
                    }
                   ]
    elif Sector == 'All':
        aggs = [
                { "$match":{ "LGA": LGA }
                },
                { "$group": { "_id": "$Year", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                },
                { "$sort": { "_id": 1}
                }
               ]
    else:
        aggs = [
                { "$match":{ "LGA": LGA, "Sector": Sector }
                },
                { "$group": { "_id": "$Year", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                },
                { "$sort": { "_id": 1}
                }
               ]
    print(aggs)
    results = combined.aggregate(aggs)
    return find_all(results)

@app.route("/get_LGA_data/<Year>/<Sector>",methods=['GET'])
def get_LGA_data(Year, Sector):
 # Fetch the date for this Year/Sector combination
    if Year == 'All':
        if Sector == 'All':
            aggs = [
                    { "$group": { "_id": "$LGA", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                    },
                    { "$sort": { "_id": 1}
                    }
                   ]
        else:
            aggs = [
                    { "$match":{ "Sector": Sector }
                    },
                    { "$group": { "_id": "$LGA", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                    },
                    { "$sort": { "_id": 1}
                    }
                   ]
    elif Sector == 'All':
            aggs = [
                    { "$match":{ "Year": int(Year) }
                    },
                    { "$group": { "_id": "$LGA", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                    },
                    { "$sort": { "_id": 1}
                    }
                   ]
    else:
        aggs = [
                { "$match":{ "Year": int(Year), "Sector": Sector }
                },
                { "$group": { "_id": "$LGA", "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                },
                { "$sort": { "_id": 1}
                }
               ]
    print(aggs)
    results = combined.aggregate(aggs)
    return find_all(results)

@app.route("/get_Sector_data/<Year>/<LGA>",methods=['GET'])
def get_Sector_data(Year, LGA):
 # Fetch the date for this Year/LGA combination
    if Year == 'All':
        if LGA == 'All':
            aggs = [
                    { "$group": { "_id": "$Sector",  "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                    },
                    { "$sort": { "_id": 1}
                    }
                   ]
        else:
            aggs = [
                    { "$match":{ "LGA": LGA }
                    },
                    { "$group": { "_id": "$Sector",  "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                    },
                    { "$sort": { "_id": 1}
                    }
                   ]
    elif LGA == 'All':
        aggs = [
                { "$match":{ "Year": int(Year) }
                },
                { "$group": { "_id": "$Sector",  "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                },
                { "$sort": { "_id": 1}
                }
               ]
    else:
        aggs = [
                { "$match":{ "Year": int(Year), "LGA": LGA }
                },
                { "$group": { "_id": "$Sector",  "totalEmission": { "$sum": "$Emissions_tonnes_CO2-e" }}
                },
                { "$sort": { "_id": 1}
                }
               ]
    print(aggs)
    results = combined.aggregate(aggs)
    return find_all(results)

## KKC - added end ##
if __name__ == '__main__':
    app.run(debug=True)
