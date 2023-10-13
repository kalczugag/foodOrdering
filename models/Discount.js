const mongoose = require("mongoose");
const { Schema } = mongoose;

const discountSchema = new Schema({
    code: { type: String, required: true },
    amount: { type: Number, required: true },
    expiresAt: { type: String, required: false },
});

mongoose.model("discount", discountSchema);
