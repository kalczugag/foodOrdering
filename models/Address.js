const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
    street: String,
    city: String,
    postal: Number,
});

module.exports = addressSchema;
