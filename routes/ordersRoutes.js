const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const Order = mongoose.model("orders");

module.exports = (app) => {
    app.get("/api/orders", requireLogin, async (req, res) => {
        const userId = req.user._id;
        const isAdmin = req.query.admin === "true"; // Check if the request is for admin

        try {
            let orders;

            if (isAdmin) {
                orders = await Order.find({});
            } else {
                orders = await Order.find({ _user: userId });
            }

            res.status(200).send(orders);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get("/api/orders/:orderId", async (req, res) => {
        const orderId = req.params.orderId;

        if (orderId) {
            try {
                const userOrder = await Order.findById(orderId);

                res.status(200).send(userOrder);
            } catch (err) {
                res.status(500).send(err);
            }
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
            // Validate status value here if necessary

            const updatedOrder = await Order.findByIdAndUpdate(
                orderToUpdate,
                {
                    $set: { status },
                },
                { new: true }
            ).select("-sensitiveField"); // Exclude sensitive fields from the response

            if (!updatedOrder) {
                return res.status(404).send({ error: "Order not found" });
            }

            res.status(200).send(updatedOrder);
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).send({
                error: "An error occurred while updating the order.",
            });
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
