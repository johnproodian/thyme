const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        productID: {
            type: String,
            required: true,
            unique: true
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
        storeIDs: [String],
        userIDs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)

const Product = model("Product", productSchema);

module.exports = Product;