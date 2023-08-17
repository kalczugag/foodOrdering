const mongoose = require("mongoose");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const Products = mongoose.model("products");

module.exports = (app) => {
    app.post("/api/stripe", async (req, res) => {
        try {
            const lineItems = await Promise.all(
                req.body.map(async (item) => {
                    const storeItem = await Products.findById(item._id);
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: storeItem.title,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: item.quantity,
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems, // Use the resolved array of line items
                success_url: `${keys.redirectDomain}?success=true`,
                cancel_url: `${keys.redirectDomain}?canceled=true`,
            });

            return res.status(200).send(session);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });
};
