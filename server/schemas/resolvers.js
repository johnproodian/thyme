const { User, Product } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get all users
        users: async() => {
            return User.find()
                .select('-__v -password');
        },
        products: async() => {
            return Product.find()
                .select('-__v');
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
        addProduct: async(parent, {productID, name, description, storeID}, {user}) => {
            // const { _id } = user;
            // console.log(_id)
            // console.log('con.user: ', context.user);
            // need to add context.user conditional
            // need to connect product to user
            // need to add functionality where if product exists, storeID should be added to its stores, and if that is already there, nothing happens...
            // console.log(productID, name)
            // return await Product.create({productID, name})
            const productToUpdate = await Product.findOne({ productID });(productID);
            console.log(productToUpdate);
            if (!productToUpdate) {
                console.log('no productToUPdate!!!')
                const newProduct = await Product.create({ productID, name, description, storeID: [storeID], userIDs: [user._id]});
                console.log('new one!: ', newProduct)

            }
            console.log('productToUpdate: ', productToUpdate)
  
                // const newProduct = await Product.create(
                //     {
                //         productID: _id,
                //         name,
                //         description,
                //         $push: { storeIDs: storeID }
                //     },
                //     {
                //         new: true,
                //         // upsert: true
                //     });

                //     return newProduct;
          
        },
        deleteAll: async() => {
            await User.deleteMany({});

            return User.find();
        }

        // log out
    }
}


module.exports = resolvers;