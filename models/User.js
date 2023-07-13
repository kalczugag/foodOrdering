const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    username: String,
    password: String,
    admin: { type: Boolean, default: false },
    name: String,
    email: String,
    city: String,
    address: String,
    postalCode: String,
    phone: String,
    DateCreated: Date,
});

mongoose.model("users", userSchema);
