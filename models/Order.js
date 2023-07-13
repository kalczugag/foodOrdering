const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
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

mongoose.model("orders", orderSchema);
