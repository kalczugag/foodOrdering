const mongoose = require("mongoose");
const cartItemSchema = require("./CartItem");
const addressSchema = require("./Address");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        _user: { type: Schema.Types.ObjectId, ref: "User" },
        _paymentId: { type: String, required: true },
        address: { type: addressSchema, required: true },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
        },
        products: [cartItemSchema],
    },
    { timestamps: true }
);

mongoose.model("orders", orderSchema);
