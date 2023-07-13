const mongoose = require("mongoose");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const Products = mongoose.model("products");

module.exports = (app) => {
    app.post("/api/stripe", async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: req.body.items.map((item) => {
                const storeItem = Products.findOne(item.id);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.title,
                        },
                        unit_amount: storeItem.price,
                    },
                    quantity: storeItem.quantity,
                };
            }),
            success_url: `${keys.redirectDomain}?success=true`,
            cancel_url: `${keys.redirectDomain}?canceled=true`,
        });

        res.redirect(303, session.url);
    });
};
