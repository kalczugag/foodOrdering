const mongoose = require("mongoose");
const keys = require("../config/keys");
const bodyParser = require("body-parser");
const stripe = require("stripe")(keys.stripeSecretKey);
const Products = mongoose.model("products");
const Cart = mongoose.model("cart");
const Order = mongoose.model("orders");

let user;

module.exports = (app) => {
    app.post("/api/stripe", async (req, res) => {
        user = req.user;

        try {
            const lineItems = await Promise.all(
                req.body.items.map(async (item) => {
                    const storeItem = await Products.findById(item._id);
                    const discountedPrice =
                        item.price - item.price * req.body.discount;
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: storeItem.title,
                            },
                            unit_amount: discountedPrice * 100,
                        },
                        quantity: item.quantity,
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems, // Use the resolved array of line items
                success_url: `${keys.redirectDomain}/profile/history`,
                cancel_url: `${keys.redirectDomain}/cart`,
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

                if (event.data.object.payment_status === "paid") {
                    const cart = await Cart.findOne({ _user: user._id });

                    const order = new Order({
                        _user: user._id,
                        _paymentId: event.data.object.id,
                        address: user.address,
                        total: event.data.object.amount_total,
                        status: event.data.object.payment_status,
                        products: cart.products,
                    });

                    await order.save();

                    await Cart.findOneAndUpdate(
                        { _user: user._id },
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
