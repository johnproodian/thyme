const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        productID: {
            type: String,
            required: true,
            
        }
    }
)