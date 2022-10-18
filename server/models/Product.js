const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        _id: {
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