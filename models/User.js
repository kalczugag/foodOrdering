const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    username: String,
    password: String,
});

mongoose.model("users", userSchema);
