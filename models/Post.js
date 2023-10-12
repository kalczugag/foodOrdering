const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: false },
    },
    { timestamps: true }
);

mongoose.model("post", postSchema);
