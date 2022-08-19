const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
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
        zipCode: {
            type: String,
            trim: true
        }
    }
);

userSchema.methods.isCorrectPassword = (password) => {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema)

module.exports = User;