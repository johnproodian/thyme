const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        storeID: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
    }


    type Mutation {
        addUser(username: String!, email: String!, password: String!, storeID: String): Auth
        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
