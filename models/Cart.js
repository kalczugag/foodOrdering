const mongoose = require("mongoose");
const cartItemSchema = require("./CartItem");
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        _user: { type: Schema.Types.ObjectId, ref: "User" },
        products: [cartItemSchema],
    },
    { timestamps: true }
);

mongoose.model("cart", cartSchema);
