const mongoose = require('mongoose')
const itemModel = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    des:{
        type: String,
        default: null,
    },

    price: {
        type: Number,
    },

    category:{
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: 'noImage.png'
    },
})

const Item = mongoose.model("Item", itemModel, "Item")
module.exports = Item