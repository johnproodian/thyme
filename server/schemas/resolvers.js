const { User } = require('../models');
// const { }

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
            return User.create(args);
        }
    }
}


module.exports = resolvers;