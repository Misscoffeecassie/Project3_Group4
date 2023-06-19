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

app = Flask(__name__)

# Landing Page
@app.route("/")
def index():
    """List all available api routes."""
    return render_template("index.html")

def find_all(query_result):
    temp_list = []
    for row in query_result:
       temp_list.append(row)
    json_variables = json.dumps(temp_list,default=json_util.default)
    return json_variables 


@app.route("/get_stationary_energy",methods=['GET'])
def get_stationary_energy():
    results = stationary_energy.find({})
    return find_all(results)

@app.route("/get_geo_data",methods=['GET'])
def get_geo_data():
    # Fetch stationary energy documents
    results = geo_data.find({})
    return find_all(results)

@app.route("/get_transport",methods=['GET'])
def get_transport():
    # Fetch transport documents
    results = transport.find({})
    return find_all(results)

@app.route("/get_waste",methods=['GET'])
def get_waste():
    # Fetch waste documents
    results = waste.find({})
    return find_all(results)

@app.route("/get_electricity_generation",methods=['GET'])
def get_electricity_generation():
    # Fetch electricity generation documents
    results = electricity_generation.find({})
    return find_all(results)

@app.route("/get_agriculture",methods=['GET'])
def get_agriculture():
    # Fetch agriculture  documents
    results = agriculture.find({})
    return find_all(results)


@app.route("/get_lulucf",methods=['GET'])
def get_lulucf():
    # Fetch lulucf  documents
    results = lulucf.find({})
    return find_all(results)

@app.route("/get_elec_consumption",methods=['GET'])
def get_elec_consumption():
 # Fetch electricity consumption docuemnts
    results = electricity_consumption.find({})
    return find_all(results)

@app.route("/get_all_data",methods=['GET'])
def get_all_data():
    # Fetch fugitive  documents
    results = combined.find({})
    return find_all(results)

@app.route("/get_by_year/<year>/<lga>",methods=['GET'])
def get_by_year(year,lga):
    sectors = ['Electricity Consumption - Scope 2','Agriculture',
                'Fugitive Emissions','Fugitive Emissions',
                'Land Use, Land Use Change and Forestry',
                'Electricity Generation','Waste','Transport',
                'Stationary Energy (excluding Electricity Generation)']
    sector_by_data = []
    for i in range(len(sectors)):
        templist = []
        query = {'Year':int(year),'LGA':lga,'Sector':sectors[i]}
        results = combined.find(query)
        for row in results:
            templist.append(row)
        sector_by_data.append(templist)
    json_variables = json.dumps(sector_by_data,default=json_util.default)
    return json_variables


if __name__ == '__main__':
    app.run(debug=True)