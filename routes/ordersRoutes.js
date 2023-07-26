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
        const { _user, address, total, status, products } = req.body;

        const order = new Order({
            _user,
            address,
            total,
            status,
            products,
        });

        try {
            await order.save();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
