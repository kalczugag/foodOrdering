const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: false,
    },
    size: {
        type: String,
        required: true,
    },
    extraOptions: {
        type: [],
    },
});

module.exports = cartItemSchema;
