const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        email: String
        storeID: String
        productIDs: [String]
    }

    type Product {
        productID: ID
        name: String
        description: String
        storeIDs: [String]
        userIDs: [ID]
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
        addProduct(productID: ID!, name: String!, description: String, storeID: String): Product
        deleteAllUsers: [User]
        deleteAllProducts: [Product]
    }
`;

// users
// addUser
// login
// updateStore
// 

module.exports = typeDefs;
