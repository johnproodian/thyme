require('dotenv').config();
const { Buffer } = require('node:buffer');
const axios = require('axios');

const apiBaseUrl = process.env.API_BASE_URL;
const oauth2BaseUrl = process.env.OAUTH2_BASE_URL;
const clientId = process.env.KROGER_CLIENT_ID;
const clientSecret = process.env.KROGER_CLIENT_SECRET;
console.log('cli i: ', clientId);
console.log(clientSecret);

const getKrogerToken = async () => {

    axios.post("https://api.kroger.com/v1/connect/oauth2/token", 
        {
            "grant_type": "client_credentials",
            "scope": "product.compact"
        }, 
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",

                // TO-DO: use Buffer or something else to base64 encode credentials, rather than hard-coding
                "Authorization": "Basic dGh5bWUtYXBwLTMwNzA2ODIwMzE0ZjQxNmI1MWRkMTljZjk3ZWNkNDNmNjIwNDMzNzAxNDA4MDUyMDgxMzpiNXJEQ3A4TzJxbXl6MzJjeFpxTVdQOFF5a3BnYnhQZXhYbHY4OGNL"
            }
        }
    )
        .then( response => {
            console.log(response);
        })

    // const encodedCredentials = (Buffer.from(`${clientId}:${clientSecret}`, `ascii`));
    // console.log('encodedCredentials: ', encodedCredentials)
}

getKrogerToken();

module.exports = { apiBaseUrl, oauth2BaseUrl, clientId, clientSecret };
