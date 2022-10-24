# Thyme

## Starting the App
* Both servers simultaneously: run ```npm run develop``` in the root directory.
* Just the client: run ```npm start``` in the thyme-app/ directory.
* Just the server: run ```npm run watch``` in the server/ directory. To start it without nodemon, run ```npm start```.

### Authentication (in addition to other authentication notes from earlier commit)

On the front end, whenever authentication is needed--to conditionally render a page only for logged in users, or literally to log a user in or out--do the following:

* Import from the auth module from the auth folder (something like):

```
import Auth from '../../../utils/auth' // adjust the path as necessary, obviously
```

* The mutation that logs a user in or signs them up will return a data object that includes a generated token. Get that token from the object and pass it through the login or method from Auth:

```
// probably something like:
Auth.login(data.login.token);
```

* Similarly when a user needs to be logged out:

```
Auth.logout();
```

* If/when a page needs to be conditionally rendered (based on whether a user is logged in or not), you can do something like this to render the div only if the user is logged in:

```
const loggedIn = Auth.loggedIn();

return (
    <main>
        {loggedIn && (
            <div>You are logged in!</div>
        )}

    </main>
)
```
    



## Overview of Authentication with JWTs
Iyan and I (John) have been talking about using JSON web tokens for authentication. 

The idea is: 
* When a user signs up or logs in, the mutation that is used for each either creates or finds a user by those credentials in the db, generates a JWT (ie, encodes the user email, _id, and expiration time into a token), and returns the token holding all that info secretly (along with the user info as a plain object) to the front end--where we will store it in localStorage (last step of loggin in or signing up is to get the token from the data returned from the back end and set it to localStorage).
* Whenever the user wants to do anything on the back end that requires being logged in, we will get the token from localStorage and send it as part of a header along with whatever query or mutation and http body we send (I have set up the App.js file to get the token and send it automatically if it exists), and the api will decode the token and see if the credentials are valid and not expired before it completes the rest of the request (updating user info, pulling their product info, etc). 
* Also, for pages/compoments that require being logged in to view, we will conditionally render those pages/components by getting the token from localStorage, using [jwt-decode](https://www.npmjs.com/package/jwt-decode) to decode it, and conditionally render the page/component if the decoded expiration time is before the current time.
* When the user logs out, we do this by removing the token from localStorage.
