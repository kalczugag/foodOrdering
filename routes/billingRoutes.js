const mongoose = require("mongoose");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const Products = mongoose.model("products");

const endpointSecret =
    "whsec_1cf4bd23b58bdfa1c78190bd4726ad3e1786b094ba24ca66f687596c734c98f6";

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

    app.post(
        "/api/stripe/webhook",

        (req, res) => {
            let event = req.body;
            // Only verify the event if you have an endpoint secret defined.
            // Otherwise use the basic event deserialized with JSON.parse
            if (endpointSecret) {
                // Get the signature sent by Stripe
                const signature = req.headers["stripe-signature"];
                try {
                    event = stripe.webhooks.constructEvent(
                        req.body,
                        signature,
                        endpointSecret
                    );
                } catch (err) {
                    console.log(
                        `⚠️  Webhook signature verification failed.`,
                        err.message
                    );
                    return res.sendStatus(400);
                }
            }

            // Handle the event
            switch (event.type) {
                case "payment_intent.succeeded":
                    const paymentIntent = event.data.object;
                    console.log(
                        `PaymentIntent for ${paymentIntent.amount} was successful!`
                    );
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                    break;
                case "payment_method.attached":
                    const paymentMethod = event.data.object;
                    // Then define and call a method to handle the successful attachment of a PaymentMethod.
                    // handlePaymentMethodAttached(paymentMethod);
                    break;
                default:
                    // Unexpected event type
                    console.log(`Unhandled event type ${event.type}.`);
            }

            // Return a 200 response to acknowledge receipt of the event
            res.send();
        }
    );
};
