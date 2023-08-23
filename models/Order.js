const mongoose = require("mongoose");
const cartItemSchema = require("./CartItem");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        _user: { type: Schema.Types.ObjectId, ref: "User" },
        _paymentId: { type: String, required: true },
        address: {
            type: String,
            required: false,
            maxlength: 200,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: 0,
        },
        products: [cartItemSchema],
    },
    { timestamps: true }
);

mongoose.model("orders", orderSchema);
