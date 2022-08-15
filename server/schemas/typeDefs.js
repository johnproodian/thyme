const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        zipCode: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, zipCode: String): User
    }
`;

module.exports = typeDefs;
