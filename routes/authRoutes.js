const mongoose = require("mongoose");
const passport = require("passport");
const requireAdmin = require("../middlewares/requireAdmin");

const Cart = mongoose.model("cart");

module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        async (req, res) => {
            res.redirect("/");

            const existingCart = await Cart.findOne({
                _user: req.user._id,
            });

            const cart = new Cart({
                _user: req.user._id,
                products: [],
            });

            if (!existingCart) {
                try {
                    await cart.save();
                } catch (err) {
                    res.status(422).send(err);
                }
            }
        }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });

    app.post("/api/admin", requireAdmin, (req, res) => {
        res.redirect("/admin");
    });
};
