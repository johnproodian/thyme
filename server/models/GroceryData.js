const { Schema, model } = require('mongoose');

const groceryDataSchema = new Schema(
    {
        item: {
            type: String,
            required: true,
            unique: false
        },
        productID: {
            type: String,
            required: true,
            unique: false
        },
        asOfDate: {
            type: Date,
            default: Date.now
        },
        salePrice: {
            type: String,
            required: false,
            unique: false
        },
        regPrice: {
            type: String,
            unique: false
        },
        storeID: {
            type: String,
            unique: false,
            required: true
        }
    },

)

const GroceryData = model("ProductData", groceryDataSchema);

module.exports = GroceryData;