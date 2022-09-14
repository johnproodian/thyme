# Testing to and playing with requests package

import requests             # Handles requests from api
import datetime             # Get the current date that data was pulled
import tokenconfig          # config file for token pulls

# Sample API call used to test connection and results
# https://api.kroger.com/v1/connect/oauth2/authorize?scope={{SCOPES}}&response_type=code&client_id={{CLIENT_ID}}&redirect_uri={{REDIRECT_URI}}

# Set Parameters
# TODO: Hide these in a config file - at least the secret
url_test = "https://api.kroger.com/v1/products?filter.term=milk&filter.locationId=03400732"
url = 'https://api.kroger.com/v1/connect/oauth2/token'
client_id = tokenconfig.client_id
client_secret = tokenconfig.client_secret


# This function retrieves the auth token from the API -  Token needs to be refreshed every 30 minutes.
# Function returns just the token needed to authorize for api calls.
def get_access_token(url, client_id, client_secret):
    response = requests.post(
        url,
        data={"grant_type": "client_credentials", "scope": "product.compact"},
        auth=(client_id, client_secret)

    )
    return response.json()["access_token"]



#TODO: Function works but is refreshing every pull.  Need to adjust to only use token refresh but error 401 happens
#  Maybe split up the function into smaller ones and intergrat them instead of code replication.
def pullItem(type, location, limit):
    url2 = "https://api.kroger.com/v1/products?filter.term=" + type + "&filter.locationId=" + location + "&filter.limit=" + limit
    payload = {}
    headers = {}

    url = 'https://api.kroger.com/v1/connect/oauth2/token'
    client_id = 'thymeprod-d67de968e437e52b4764a7733763545c2737297631058086522'
    client_secret = 'GwtEOSgmYTVuYGlQgTILcDtkUDRzbvIcQaQ2MzU0'
    # Working code to pull price data from token.

    payload={}
    headers = {
    'Authorization': 'Bearer ' + get_access_token(url, client_id, client_secret)
    }


    response = requests.request("GET", url2, headers=headers, data=payload)
    print(response.status_code)
    if response.status_code != 200:
        json_response = response.json()
        print("Time to get a new token!")
    else:
        json_response = response.json()
        print('Date: ' + datetime.datetime.now().strftime("%m/%d/%Y"))
        print('Item: ' + str(json_response['data'][0]['description']))
        print('Promo price: ' + str(json_response['data'][0]['items'][0]['price']['promo']))
        print('Regular Price: ' + str(json_response['data'][0]['items'][0]['price']['regular']))



# Function call
pullItem('bread', '03400738', '1')


