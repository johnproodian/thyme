const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        email: String
        storeID: String
        productIDs: [String]
    }

    type Product {
        _id: ID
        name: String
        description: String
        storeIDs: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        products: [Product]
    }

    type Mutation {
        addUser(email: String!, password: String!, storeID: String): Auth 
        login(email: String!, password: String!): Auth
        updateStore(storeID: String!): User
        addProduct(_id: ID!, name: String!, description: String, storeID: String): Product
        deleteAll: [User]
    }
`;

// users
// addUser
// login
// updateStore
// 

module.exports = typeDefs;
