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
    
