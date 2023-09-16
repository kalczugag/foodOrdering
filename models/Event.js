const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: String,
    date: {
        day: String,
        month: String,
        year: String,
        time: {
            from: String,
            to: String,
        },
    },
    img: String,
});

mongoose.model("events", eventSchema);
