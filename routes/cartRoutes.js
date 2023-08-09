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

    app.delete("/api/cart", async (req, res) => {
        try {
            const cartId = req.body.cartId; // Assuming you have a cart _id
            const productIdToDelete = req.body.productId; // Assuming you have a product _id

            const updatedCart = await Cart.findOneAndUpdate(
                { _id: cartId },
                { $pull: { products: { _id: productIdToDelete } } },
                { new: true }
            );

            if (!updatedCart) {
                return res.status(404).send({ message: "Cart not found" });
            }
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" });
        }
    });
};
