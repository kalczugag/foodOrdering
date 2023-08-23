const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const Order = mongoose.model("orders");

module.exports = (app) => {
    app.get("/api/orders/admin", requireAdmin, async (req, res) => {
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
            const userOrders = await Order.find({ _user: userId });

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

    app.put("/api/orders", requireAdmin, async (req, res) => {
        const orderToUpdate = req.body._id;
        const { status } = req.body;

        try {
            const updatedOrders = await Order.findByIdAndUpdate(
                orderToUpdate,
                {
                    $set: { status },
                },
                { new: true }
            );

            res.status(200).send(updatedOrders);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });

    app.delete("/api/orders", requireAdmin, async (req, res) => {
        const userId = req.user._id;
        const orderToRemove = req.body._id;

        try {
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
