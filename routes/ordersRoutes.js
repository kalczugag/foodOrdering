const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const Order = mongoose.model("orders");

module.exports = (app) => {
    app.get("/api/orders", requireAdmin, async (req, res) => {
        //for admin
        try {
            const orders = await Order.find({});

            res.status(200).send(orders);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get("/api/orders", requireLogin, async (req, res) => {
        //for user
        const userId = req.user._id;

        try {
            const userOrders = await Order.findById(userId);

            res.status(200).send(userOrders);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post("/api/orders", requireAdmin, async (req, res) => {
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
