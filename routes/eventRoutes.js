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

        const event = new Event({
            title,
            date,
            img,
        });

        try {
            await event.save();
            res.status(200).send(event);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.put("/api/events", requireAdmin, async (req, res) => {
        const eventToUpdate = req.body._id;
        const { title, date, img } = req.body;

        try {
            let updateObject = {
                title,
                date,
            };

            if (img !== null) {
                updateObject.img = img;
            }

            const updatedEvents = await Event.findByIdAndUpdate(
                eventToUpdate,
                {
                    $set: updateObject,
                },
                { new: true }
            );

            res.status(200).send(updatedEvents);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });

    app.delete("/api/events/:eventId", async (req, res) => {
        const { eventId } = req.params;

        try {
            await Event.deleteOne({ _id: eventId });
            res.status(200).send("Successful remove");
        } catch (err) {
            console.error(err);
            res.send(500).send("Internal Server Error");
        }
    });
};
