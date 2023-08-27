const mongoose = require("mongoose");
const keys = require("../config/keys");
const bodyParser = require("body-parser");
const stripe = require("stripe")(keys.stripeSecretKey);

const Products = mongoose.model("products");
const Cart = mongoose.model("cart");
const Order = mongoose.model("orders");

let userId;

module.exports = (app) => {
    app.post("/api/stripe", async (req, res) => {
        userId = req.user._id;

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

    app.post(
        "/api/webhook",
        bodyParser.raw({ type: "application/json" }),
        async (req, res) => {
            const sig = req.headers["stripe-signature"];

            try {
                const event = await stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    keys.stripeEndpointSecret
                );

                console.log(event[0]);

                if (event.data.object.payment_status === "paid") {
                    const items = await Cart.findById(userId);

                    const order = new Order({
                        _user: userId,
                        _paymentId: event.data.object.id,
                        address: "",
                        total: event.data.object.amount_total,
                        status: event.data.object.payment_status,
                        products: items,
                    });

                    await order.save();

                    await Cart.findOneAndUpdate(
                        { _user: userId },
                        {
                            $set: { products: [] },
                        }
                    );
                }

                res.send({ success: true });
            } catch (err) {
                console.log(err.message);
                res.status(400).send({ success: false });
            }
        }
    );
};
