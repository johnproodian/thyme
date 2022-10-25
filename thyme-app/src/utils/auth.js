import decode from 'jwt-decode';

// I think we only need to use login(), logout(), and loggedIn() explicitly in front-end code--unless special circumstances call for one of the others
class AuthService {

    // set token to localStorage and reload the page to homepage when a user logs in
    login(idToken) {
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // remove the token from localStorage, effectively logging the user out
    logout() {
        localStorage.clearItem('id_token');

        window.location.assign('/');
    }

    // check to see if user is logged in by retrieving the token from localStorage--if there is a non-expired token, return true (that user is logged in)
    loggedIn() {
        const token = this.getToken();

        // Double negation (I believe) to ensure that a boolean is always returned
        return !!token && !this.isTokenExpired(token);
    }

     // retrieve token from localStorage
     getToken() {
        return localStorage.getItem('id_token');
    }

    // check if token is expired; return true if expired
    isTokenExpired() {
        try {
            // gets the object that was made into a token--including email, password, storeID, etc.
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
}