# Import dependencies
from pymongo import MongoClient
from pprint import pprint
from flask import Flask, jsonify,render_template

# Create an instance of MongoClient
mongo = MongoClient(port=27017)

# confirm that our new database was created
print(mongo.list_database_names())

# assign the met database to a variable name
db = mongo['greenhouse_emission']

# review the collections in our new database
# pprint(db.list_collection_names())

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

# Find how many documents have culture as "Nayarit"
# print('elec consumptions',electricity_consumption.count_documents({}))
# print('fugitive',fugitive.count_documents({}))
# print('lulucf',lulucf.count_documents({}))
# print('ippu ',ippu.count_documents({}))
# print('agriculture',agriculture.count_documents({}))
# print('electricity_generation ',electricity_generation.count_documents({}))
# print('waste',waste.count_documents({}))
# print('transport',transport.count_documents({}))
# print('geo_data',geo_data.count_documents({}))

item_dict = {
    "waste":waste.count_documents({}),
    "agriculture":agriculture.count_documents({})
}
app = Flask(__name__)

@app.route("/")
def index():
    """List all available api routes."""
    return render_template("index.html")

@app.route("/static/pages/charts/chartjs.html")
def chart():
    """List all available api routes."""
    return render_template("../static/pages/charts/chartjs.html")
    
@app.route("/api/items")
def get_items():
    return jsonify(item_dict)

if __name__ == '__main__':
    app.run(debug=True)