const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");

const Cart = mongoose.model("cart");

module.exports = (app) => {
    app.get("/api/cart", requireLogin, async (req, res) => {
        try {
            const cart = await Cart.findOne({ _user: req.body._id });

            if (cart) {
                res.send(cart);
            } else {
                res.status(404).send("Cart not found");
            }
        } catch (err) {
            res.status(500).send("Internal server error");
        }
    });

    app.post("/api/cart", requireLogin, (req, res) => {});
};
