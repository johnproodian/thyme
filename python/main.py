# Main python file to run script that pulls item data every day and adds to mongo db

import apiTools
import time

# Check if token in valid and if not refresh token
# Create a loop that runs once a day over multiple items
# Might need t change pullitem to accept a token
# Run pullItem

x = 0
while x < 5:
    time.sleep(5)
    x = x + 1
    print(x)


print("hello")
