const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

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
};
