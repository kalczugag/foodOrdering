const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema(
    {
        _user: { type: Schema.Types.ObjectId, ref: "User" },
        address: {
            type: String,
            required: true,
            maxlength: 200,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            default: 0,
        },
        products: [],
    },
    { timestamps: true }
);

mongoose.model("orders", OrderSchema);
