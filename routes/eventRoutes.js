const requireAdmin = require("../middlewares/requireAdmin");
const mongoose = require("mongoose");

const Event = mongoose.model("events");

module.exports = (app) => {
    app.get("/api/events", async (req, res) => {
        try {
            const events = await Event.find({});

            res.status(200).send(events);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post("/api/events", requireAdmin, async (req, res) => {
        const { title, date, img } = req.body;
        console.log(title, date, img);

        const event = new Event({
            title,
            date,
            img,
        });

        try {
            await event.save();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
