const mongoose = require("mongoose");
const requireAdmin = require("../middlewares/requireAdmin");

const Product = mongoose.model("products");

module.exports = (app) => {
    app.get("/api/products", async (req, res) => {
        const products = await Product.find({});

        res.send(products);
    });

    app.post("/api/products", requireAdmin, async (req, res) => {
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
            res.status(200).send(product);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.post("/api/products/remove", requireAdmin, async (req, res) => {
        const productToRemove = req.body._id;

        try {
            const updatedProducts = await Product.findByIdAndRemove(
                productToRemove
            );

            res.status(200).send(updatedProducts);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });
};
