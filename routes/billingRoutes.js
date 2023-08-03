const mongoose = require("mongoose");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const Products = mongoose.model("products");

module.exports = (app) => {
    app.post("/api/stripe", async (req, res) => {
        console.log(req.body);

        // Assuming req.body is an array of objects, each representing a product
        const lineItems = await Promise.all(
            req.body.map(async (item) => {
                const storeItem = await Products.findById(item._id);

                // Convert price to cents (multiply by 100)
                const unitAmount = item.price * 100;

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.title,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: item.quantity,
                };
            })
        );

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `${keys.redirectDomain}?success=true`,
            cancel_url: `${keys.redirectDomain}?canceled=true`,
        });

        res.redirect(303, session.url);
    });
};
