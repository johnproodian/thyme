const jwt = require('jsonwebtoken');

const secret = 'supersupersecret!';
const expiration = '2h';

module.exports = {
    // gets the token from the authorization header, verfies/decodes it to get user data, returns the token as a req so that it can be sent as context along with args for any resolvers that need authentication
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        console.log(token);

        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("invalid token");
        }

        return req;
    },

    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload}, secret, {expiresIn: expiration});
    }
};

