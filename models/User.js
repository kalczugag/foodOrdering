const mongoose = require("mongoose");
const addressSchema = require("./Address");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        googleId: String,
        username: String,
        password: String,
        admin: { type: Boolean, default: false },
        name: String,
        email: String,
        address: addressSchema,
        phone: String,
    },
    { timestamps: true }
);

mongoose.model("users", userSchema);
