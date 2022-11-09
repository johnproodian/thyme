const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        productID: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: false
        },
        storeIDs: [String]
    }
)

const Product = model("Product", productSchema);

module.exports = Product;