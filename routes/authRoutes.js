const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.model("users");

module.exports = (app) => {
    app.get("/dashboard", requireLogin, (req, res) => {
        res.send("dashboard");
    });

    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/");
        }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });

    app.post("/api/admin", async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username, admin: true }).select({
            googleId: false,
            name: false,
            email: false,
            city: false,
            address: false,
            postalCode: false,
            phone: false,
            DateCreated: false,
        });

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.redirect("/admin/dashboard");
            } else {
                res.status(400).send({ message: "Wrong password" });
            }
        });
    });
};
