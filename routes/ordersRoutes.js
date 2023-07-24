const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const Order = mongoose.model("orders");

module.exports = (app) => {
    app.get("/api/orders", async (req, res) => {
        const orders = await Order.find({});

        res.send(orders);
    });

    app.post("/api/orders", requireLogin, requireAdmin, async (req, res) => {
        const { title, desc, img, price, extraOptions } = req.body;

        const order = new Order({
            title,
            desc,
            img,
            price,
            extraOptions,
        });

        try {
            await order.save();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
