# Import dependencies
from pymongo import MongoClient
from pprint import pprint
from flask import Flask, jsonify,render_template,Response
import json
from bson import json_util


mongodb_host = 'localhost'
db_name = 'greenhouse_emission'
collection_name = 'electricity_consumption'

# Create an instance of MongoClient
mongo = MongoClient(port=27017)

# confirm that our new database was created
print(mongo.list_database_names())

# assign the met database to a variable name
db = mongo['greenhouse_emission']

# review the collections in our new database
pprint(db.list_collection_names())

# assign the collection to a variable
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

## KKC Added ##

selected_year='2016'
selected_LGA='Brisbane'
selected_emission='Agriculture'
selected_emission_subcat='Beef'

## KKC - yet to be done
## yearOptions, LGAoptons and emissionSubCatOptions to be selected from the collections
yearOptions = [
    '2016',
    '2017',
    '2018',
    '2019'
]
LGAoptions = [
    'Brisbane',
    'Melbourne',
    'Ballian'
]
emissionOptions = [
    'Agriculture',
    'Transport',
    'Waste',
    'Electricity Consumption',
    'LULUP',
    'Fugituve',
    'IPPU',
    'Electricity Generation',
    'Stationary Energy'
]
emissionSubCatOptions = [
    'Beef',
    'Railways',
    'Dairy',
    'Goat',
    'Heavy Duty Vehicles'
]


## End of KKC Added ##


# Find how many documents have culture as "Nayarit"
print('elec consumptions',electricity_consumption.count_documents({}))
print('fugitive',fugitive.count_documents({}))
print('lulucf',lulucf.count_documents({}))
print('ippu ',ippu.count_documents({}))
print('agriculture',agriculture.count_documents({}))
print('electricity_generation ',electricity_generation.count_documents({}))
print('waste',waste.count_documents({}))
print('transport',transport.count_documents({}))
print('geo_data',geo_data.count_documents({}))

item_dict = {
    "waste":waste.count_documents({}),
    "agriculture":agriculture.count_documents({})
}
app = Flask(__name__)

@app.route("/")
def index():
    """List all available api routes."""
    ### KKC Added / Modified ###
    ## KKC - yet to be done
    ## KK_mongo to be selected from the collections
    KK_mongo = [1, 2, 3, 5, 8]
    return render_template("index.html", kk_data = KK_mongo, yearOptions = yearOptions, selected_year = selected_year,
                           LGAoptions=LGAoptions, selected_LGA = selected_LGA,
                           emissionOptions = emissionOptions, selected_emission = selected_emission,
                           emissionSubCatOptions = emissionSubCatOptions, selected_emission_subcat = selected_emission_subcat)
    ### End of KKC Added/Modified ###

@app.route("/static/pages/charts/chartjs.html")
def chart():
    """List all available api routes."""
    return render_template("../static/pages/charts/chartjs.html")
    
@app.route("/api/items")
def get_items():
    return jsonify(item_dict)

## KKC Added ##

@app.route('/newSelection/<selected>/<value>', methods=['GET'])
def newSelection(selected, value):

    global selected_year, selected_LGA, selected_emission, selected_emission_subcat

    selected = selected
    value = value
    if selected == 'year':
        selected_year = value
    elif selected == 'LGA':
        selected_LGA = value
    elif selected == 'Emission':
        selected_emission = value
    else:
        selected_emission_subcat = value
    ## KKC - yet to be done
    ## KK_mongo to be selected from the collections
    KK_mongo = [1, 2, 3, 5, 8]
    return render_template("index.html", kk_data = KK_mongo, yearOptions = yearOptions, selected_year = selected_year,
                           LGAoptions=LGAoptions, selected_LGA = selected_LGA,
                           emissionOptions = emissionOptions, selected_emission = selected_emission,
                           emissionSubCatOptions = emissionSubCatOptions, selected_emission_subcat = selected_emission_subcat)



## End of KKC Added ##

if __name__ == '__main__':
    app.run(debug=True)
