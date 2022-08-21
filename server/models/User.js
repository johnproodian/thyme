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

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        console.log('just hashed: ', this.password)
    }
    
    next();
})

userSchema.methods.isCorrectPassword = (password) => {
    console.log('this.password ', this.password);
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema)

module.exports = User;