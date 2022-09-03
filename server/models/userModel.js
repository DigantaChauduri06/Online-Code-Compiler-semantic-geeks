const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'user must enter his/her first name'],
        min: [3, 'user\'s firstname must have a minimum of 3 characters']
    },
    lastname: {
        type: String,
        required: [true, 'user must enter his/her last name'],
        min: [3, 'user\'s lastname must have a minimum of 3 characters']
    },
    email: {
        type: String,
        required: [true, 'user must enter his/her email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'user must enter his/her password'],
        match: [
            /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, 'password must be atleast 8 characters long and must contain atleast one uppercase character and one lowercase character'
        ]
    },
    confirmpassword: {
        type: String,
        match: [
            /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, 'password must be atleast 8 characters long and must contain atleast one uppercase character and one lowercase character'
        ],
    }
}, {
    timestamps: true
});


// hashing the password
userSchema.pre('save', async function() {

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});

// generate token 
userSchema.methods.generateToken = function() {

    return jwt.sign({ userId: this._id, firstname: this.firstname, lastname: this.lastname, email: this.email}, process.env.JWT_SECRET, {expiresIn: `${process.env.EXPIRES_IN}`})
}

// compare password entered by the user with the hashed password inside the database
userSchema.methods.comparePasswords = async function(passwordEnteredByUser) {

    const isMatch = await bcrypt.compare(passwordEnteredByUser, this.password);

    return isMatch;
    
}


module.exports = mongoose.model('user', userSchema);