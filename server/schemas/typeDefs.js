const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
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
        addUser(email: String!, password: String!, storeID: String): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
