const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // 
        // get all users
        users: async() => {
            return User.find()
                .select('-__v -password');
        }
    },

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            console.log('user: ', user._id);
            const token = signToken(user);

            return { token, user };
        },
        // login
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email.')
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect credentials.');
            }

            const token = signToken(user);
            return { token, user };
        },
        updateStore: async(parent, args, context) => {
            console.log('context: ', context);
            console.log('con.us: ', context.user);
            console.log('con.id: ', context.user._id);
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { storeID: args.storeID  },
                    { new: true }
                )

                console.log('updated user: ', user);

                return user;
            }
        },
        deleteAll: async() => {
            await User.deleteMany({});

            return User.find();
        }

        // log out
    }
}


module.exports = resolvers;