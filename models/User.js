const mongoose = require('mongoose')
const userModel = mongoose.Schema({
    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
})

const User = mongoose.model("User", userModel, "User")
module.exports = User