const mongoose = require("mongoose");
const productSchema = require("./Product");
const { Schema } = mongoose;

const cartSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [productSchema],
});

mongoose.model("cart", cartSchema);
