const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");

const Cart = mongoose.model("cart");

module.exports = (app) => {
    app.get("/api/cart", requireLogin, async (req, res) => {
        try {
            const cart = await Cart.findOne({ _user: req.user._id });

            if (cart) {
                res.send(cart);
            } else {
                res.status(404).send("Cart not found");
            }
        } catch (err) {
            res.status(500).send("Internal server error");
        }
    });

    app.post("/api/cart", requireLogin, async (req, res) => {
        const existingItem = await Cart.findOne(
            {
                _user: req.user._id,
                products: {
                    $elemMatch: {
                        _id: req.body._id,
                        size: req.body.size,
                    },
                },
            },
            {
                "products.$": 1,
            }
        );

        if (existingItem) {
            try {
                const updatedItem = await Cart.findOneAndUpdate(
                    {
                        _user: req.user._id,
                        "products._id": req.body._id,
                    },
                    {
                        $inc: { "products.$.quantity": req.body.quantity },
                    },
                    {
                        $inc: { "products.$.price": req.body.price },
                    },
                    {
                        new: true, // To return the updated document
                    }
                );

                if (updatedItem) {
                    // Send a success response
                    res.status(200).send(updatedItem);
                } else {
                    // Handle the case where the cart item is not found
                    res.status(404).send({ error: "Cart item not found." });
                }
            } catch (err) {
                res.status(500).send({
                    error: "An error occurred while updating the cart.",
                });
            }
        } else {
            try {
                // Extract necessary fields from req.body
                const { _id, quantity, title, img, price, extraOptions, size } =
                    req.body;
                const newProduct = {
                    _id,
                    quantity,
                    title,
                    img,
                    price,
                    size,
                    extraOptions,
                };

                const updatedCart = await Cart.findOneAndUpdate(
                    { _user: req.user._id },
                    { $push: { products: newProduct } },
                    { new: true }
                );

                res.status(200).send(updatedCart);
            } catch (error) {
                res.status(500).send({
                    error: "An error occurred while updating the cart.",
                });
            }
        }
    });

    app.post("/api/cart/remove", requireLogin, async (req, res) => {
        const userCartId = req.user._id;
        const productToRemove = req.body._id;

        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { _user: userCartId },
                {
                    $pull: {
                        products: { _id: productToRemove, size: req.body.size },
                    },
                },
                { safe: true, multi: false }
            );

            res.status(200).send(updatedCart);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred while updating the cart.",
            });
        }
    });
};
