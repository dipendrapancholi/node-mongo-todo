const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : false
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
}, {
    timestamps: true
});

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync( password, this.password );
};

module.exports = mongoose.model( "users", UserSchema);