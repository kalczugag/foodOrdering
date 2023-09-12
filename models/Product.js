const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 60,
        },
        desc: {
            type: String,
            required: true,
            maxlength: 200,
        },
        img: {
            type: String,
            required: true,
        },
        price: {
            type: [Number],
            required: true,
        },
        quantity: {
            type: Number,
            required: false,
        },
        extraOptions: {
            type: [],
        },
    },
    { timestamps: true }
);

module.exports = productSchema;
mongoose.model("products", productSchema);
