const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true },
    shortDesc: { type: String, required: false },
    fullDesc: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: true },
});

mongoose.model("post", postSchema);
