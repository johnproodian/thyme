# Testing to and playing with requests package

import requests             # Handles requests from api
import datetime             # Get the current date that data was pulled
import tokenconfig          # config file for token pulls
import pymongo              # Configuration

# Sample API call used to test connection and results
# https://api.kroger.com/v1/connect/oauth2/authorize?scope={{SCOPES}}&response_type=code&client_id={{CLIENT_ID}}&redirect_uri={{REDIRECT_URI}}

# Set Parameters
url_test = "https://api.kroger.com/v1/products?filter.term=milk&filter.locationId=03400732"
url = 'https://api.kroger.com/v1/connect/oauth2/token'
client_id = tokenconfig.client_id
client_secret = tokenconfig.client_secret


# This function retrieves the auth token from the API -  Token needs to be refreshed every 30 minutes.
# Function returns just the token needed to authorize for api calls.
def get_access_token():
    url = 'https://api.kroger.com/v1/connect/oauth2/token'
    client_id = tokenconfig.client_id
    client_secret = tokenconfig.client_secret

    response = requests.post(
        url,
        data={"grant_type": "client_credentials", "scope": "product.compact"},
        auth=(client_id, client_secret)

    )
    return response.json()["access_token"]




# Function is going to used to push query to mongoDB server.  Currently looking to push sale price, price, item name, and date
def pushToMongo(myItem):
    print("Posting to MongoDB")
    myclient = pymongo.MongoClient("mongodb+srv://johnproodian:" + tokenconfig.mongo_pass + "@cluster0.fpy4s.mongodb.net/Thyme?retryWrites=true&w=majority")
    mydb = myclient['Thyme']                                    # Name of Database on MongoDB
    mycol = mydb['groceryData']                                 # Collections to hold Grocery Prices
    # Current schema to add to db
    x = mycol.insert_one(myItem)                                # Insert statement




#TODO: Function works but is refreshing every pull.  Need to adjust to only use token refresh but error 401 happens
#  Maybe split up the function into smaller ones and intergrat them instead of code replication.
def pullItem(type, location, limit, token):
    # URL and payload sent to Kroger API for access and items.
    token = check_token_stale(token)
    url2 = "https://api.kroger.com/v1/products?filter.term=" + type + "&filter.locationId=" + location + "&filter.limit=" + limit
    payload={}
    headers = {
    'Authorization': 'Bearer ' + token}

    # Delete else statement and assign the token get to a variable that pulls through the function.  Needs to store
    # outside the file so it does not run each time.  
    response = requests.request("GET", url2, headers=headers, data=payload)
    print(response.status_code)
    if response.status_code != 200:
        json_response = response.json()
        print("Time to get a new token!")

    else:
        json_response = response.json()
        date = datetime.datetime.now().strftime("%m/%d/%Y")
        item = str(json_response['data'][0]['description'])
        salePrice = str(json_response['data'][0]['items'][0]['price']['promo'])
        regPrice = str(json_response['data'][0]['items'][0]['price']['regular'])
        #  Prints out return to console to check to see if it is pulling correctly
        print('Date: ' + date)
        print('Item: ' + item)
        print('Promo price: ' + salePrice)
        print('Regular Price: ' + regPrice)
        myItemData = {"date": date, "item": item, "salePrice": salePrice, "regPrice": regPrice}
        pushToMongo(myItemData)
        return token

def check_token_stale(token):
    url2 = "https://api.kroger.com/v1/products?filter.term=bread&filter.locationId=03400738&filter.limit=1"
    payload={}
    headers = {
    'Authorization': 'Bearer ' + str(token)}
    response = requests.request("GET", url2, headers=headers, data=payload)

    print(response.status_code)
    if response.status_code != 200:
        json_response = response.json()
        print("Time to get a new token!")
        return get_access_token()
    else:
        return token

# Test Function call
pullItem('water', '03400738', '1', "token")
# print(check_token_stale("this_is_my_token"))



