const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: String,
    date: {
        day: Number,
        month: String,
        year: Number,
        time: {
            from: String,
            to: String,
        },
    },
    img: String,
});

mongoose.model("events", eventSchema);
