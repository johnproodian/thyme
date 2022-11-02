# Main python file to run script that pulls item data every day and adds to mongo db

import apiTools as api

# Check if token in valid and if not refresh token
# Create a loop that runs once a day over multiple items
# Might need to change pullitem to accept a token
# Run pullItem

test_items =['bread', 'water', 'milk']
list_of_item_types =['beef', 'chicken','bread','fish','candy', 'milk',
                    'juice', 'water', 'fruit', 'vegetable', 'soup', 'bakeware',
                     'chips', 'soda', 'pork', 'crackers', 'diapers', 'cake']

# Run a large batch of preslected items.  Also check to make sure that it is not grabbing a new token
# unless a new token is needed.
for item in test_items:
    try:
        token = api.pullItem(item, '03400738', '1', token)
        print("I used the old token!")
    except:
        token = api.pullItem(item, '03400738', '1', "token")
        print("I had to get a new token")



