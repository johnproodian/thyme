// const apiBaseUrl = process.env.API_BASE_URL;
// const oauth2BaseUrl = process.env.OAUTH2_BASE_URL;
// const clientId = process.env.KROGER_CLIENT_ID;
// const clientSecret = process.env.KROGER_CLIENT_SECRET;
const { Buffer } = require('node:buffer');
const { apiBaseUrl, oauth2BaseUrl, clientId, clientSecret } = require('../config/krogerConfig');
const fs = require('fs');

const { User, Product } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
    Query: {
        // get all users
        users: async() => {
            return User.find()
                .select('-__v -password');
        },

        // Get all products
        products: async() => {
            return Product.find()
                .select('-__v');
        },

        // Get 10 closest store ids based on zip code
        storeIDs: async(parent, { zipCode }, context) => {
            // Array of storeIDs that will be filled and returned to the client
            let locationIDs = [];

            // base64-encoded client id and secret to be used to get access token from Kroger API
            const encoded = Buffer.from(`${clientId}:${clientSecret}`, 'ascii').toString('base64');

            // first request--POST to get authorization token for our application
            let response = await axios.post("https://api.kroger.com/v1/connect/oauth2/token", 
                {
                    "grant_type": "client_credentials",
                    "scope": "product.compact"
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",

                        "Authorization": `Basic ${encoded}`
                    }
                }
            )

            // store access token here to make second request below
            let krogerToken = response.data.access_token;
            let locationUrl = `${apiBaseUrl}/v1/locations?filter.zipCode.near=${zipCode}`;

            // second request--GET to get storeIDs (current settings will return 10 store IDs)
            let locationData = await axios.get(locationUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${krogerToken}`
                    }
                })

            // loop through the store objects to get the storeIDs and add them to array to send back to client
            locationData.data.data.map( location => {
                locationIDs.push(location.locationId);
            })

            console.log(locationIDs);
                    
            return locationIDs;

            //TO-DO: 
                // Set up sessions to store token so that it doesn't need to be requested every time
                // Set up conditional to refresh or get new token if the stored on has expired
                // Send back more data than just storeIDs

        }
    },

    Mutation: {
        // REGISTER--takes as arguments email, password (and, optionally, storeID as a string), creates a user in db, creates a json web token with the email and user _id, returns the jwt and the new user object.
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // LOGIN--takes email and password arguments, checks for correct PW with method from User model, creates a JWT with username and _id from User object, returns JWT and signed in user object (w/o password)
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
        // UPDATE A USER'S STOREid--checks to see if user is logged int (i.e. if user info was passed through context middleware) finds the user by id, updates the storeID from the storeID property of the args object, returns updated user
        updateStore: async(parent, args, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { storeID: args.storeID  },
                    { new: true }
                )

                if (!user) {
                    throw new Error("Something went wrong--there doesn't seem to be a user with that _id")
                }

                return user;
            }

            throw new AuthenticationError('Not logged in!');
        },
        // ADD A NEW PRODUCT TO THE DB AND ASSOCIATE IT WITH THE USER WHO WANTS TO ADD/TRACK IT--
            // 1. pass the product properties in as an argument, 
        addProduct: async(parent, {productID, name, description, storeID}, {user}) => {
             // 2. check to see if the user is logged in (which is true if there is a destructured user property from context middleware that indicates there's an active jwt),  
            if (user) {
                // 3. If logged in, see if there is already a product with that productID
                let productToUpdate = await Product.findOne({ productID });(productID);
                
                 // 4. If there is no product by that productID, 
                if (!productToUpdate) {
                    
                    // 5. Create the product,
                    await Product.create({productID, name, description, storeIDs: [storeID]} );
                    
                    // 6. Add the current user's userID to this product's array of userIDs indicating the users that are tracking it
                    productToUpdate = await Product.findOneAndUpdate(
                        { productID: productID }, 
                        {$push: { userIDs: user._id }},
                        { new: true }
                    );
                    
                    // 7. Add the productID of this product to the user's array of productIDs indicating which product she's tracking
                    const userToUpdate = await User.findByIdAndUpdate(
                        user._id,
                        {$push: {productIDs: productToUpdate.productID} },
                        { new: true }
                    )
                    
                    // 8. Return the new product
                    return productToUpdate;
                }

                // 9. If the product did exist when searched for at 3 above, then check to see if it includes the current user's userID in its userIDs array
                if (!productToUpdate.userIDs.includes(user._id)) {
                    // 10. If the the current user's userID is NOT in this product's userIDs array, then the user isn't tracking the product yet--
                        // 11. Add the product's productID to the current user's productIDs array
                    const updatedUser = await User.findByIdAndUpdate(
                        user._id,
                        { $push: {productIDs: productToUpdate.productID} },
                        { new: true }
                    );

                    // 11. Likewise, add the userID to the product's userIDs array.
                    const updatedProduct = await Product.findOneAndUpdate(
                        { productID: productID },
                        { $push: { userIDs: user._id } },
                        { new: true }
                    );

                    // 12. Return product updated with the current user's ID added
                    return updatedProduct;
                }

                throw new Error("The user is already tracking this product!");

            }

            throw new AuthenticationError('Not logged in!');
          
        },
        // Delete all users
        deleteAllUsers: async() => {
            await User.deleteMany({});
            return User.find();
        },
        // Delete all products
        deleteAllProducts: async() => {
            await Product.deleteMany({});
            return Product.find();
        }

        // log out
    }
}


module.exports = resolvers;