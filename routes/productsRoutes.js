const mongoose = require("mongoose");

const Products = mongoose.model("products");

module.exports = (app) => {
    app.get("/api/products", (req, res) => {
        const products = Products.find({});

        res.send(products);
    });
};
