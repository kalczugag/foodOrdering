const mongoose = require("mongoose");
const requireAdmin = require("../middlewares/requireAdmin");

const Product = mongoose.model("products");

module.exports = (app) => {
    app.get("/api/products", async (req, res) => {
        const prodId = req.query._id;

        if (prodId) {
            try {
                const product = await Product.findById(prodId);

                res.status(200).send(product);
            } catch (err) {
                res.status(500).send(err);
            }
        } else {
            try {
                const products = await Product.find({});

                res.status(200).send(products);
            } catch (err) {
                res.status(500).send(err);
            }
        }
    });

    app.post("/api/products", requireAdmin, async (req, res) => {
        const { title, desc, img, blurhash, price, extraOptions } = req.body;

        const product = new Product({
            title,
            desc,
            img,
            blurhash,
            price,
            extraOptions,
        });

        try {
            const newProduct = await product.save();
            res.status(200).send(newProduct);
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

    app.put("/api/products", requireAdmin, async (req, res) => {
        const productToUpdate = req.body._id;
        const { title, desc, img, blurhash, price, extraOptions } = req.body;

        try {
            const updatedProducts = await Product.findByIdAndUpdate(
                productToUpdate,
                {
                    $set: { title, desc, img, blurhash, price, extraOptions },
                },
                { new: true }
            );

            res.status(200).send(updatedProducts);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });
};
