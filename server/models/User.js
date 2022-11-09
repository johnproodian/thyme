const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        storeID: {
            type: String,
            unique: false
        },
        products: [
            {
                type: Schema.Types.String,
                ref: 'Product'
            }
        ]
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    
    next();
})

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema)

module.exports = User;