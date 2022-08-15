const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // get all users
        users: async() => {
            return User.find()
                .select('-__v -password');
        }
    },

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);

            return user;
        }
    }
}


module.exports = resolvers;