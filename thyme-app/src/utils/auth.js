import decode from 'jwt-decode';

class AuthService {

    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }
}