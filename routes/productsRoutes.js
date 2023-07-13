const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const Product = mongoose.model("products");

module.exports = (app) => {
    app.get("/api/products", (req, res) => {
        const products = Products.find({});

        res.send(products);
    });

    app.post("/api/products", requireLogin, requireAdmin, async (req, res) => {
        const { title, desc, img, price, extraOptions } = req.body;

        const product = new Product({
            title,
            desc,
            img,
            price,
            extraOptions,
        });

        try {
            await product.save();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
