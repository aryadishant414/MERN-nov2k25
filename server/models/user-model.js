const mongoose = require("mongoose");

var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // used to hash the password for security

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});


// json web token generate yaha ho rha hai
userSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error(error);
        
    }
}

// *********** Comparing the password ************
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
// in the upper line 'this' means the current user jiske liye ye function call hua hai

// define the model/collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;