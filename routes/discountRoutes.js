const requireAdmin = require("../middlewares/requireAdmin");
const mongoose = require("mongoose");

const Discount = mongoose.model("discount");

module.exports = (app) => {
    app.get("/api/discount", requireAdmin, async (req, res) => {
        try {
            const discounts = await Discount.find({});

            res.status(200).send(discounts);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get("/api/discount/check", async (req, res) => {
        const discountCode = req.query.code;

        if (!discountCode || typeof discountCode !== "string") {
            return res.status(400).send({ error: "Invalid discount code." });
        }

        try {
            const existingDiscount =
                (await Discount.findOne({ code: discountCode })) || false;

            res.status(200).send(existingDiscount);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Discount code not found." });
        }
    });

    app.post("/api/discount", requireAdmin, async (req, res) => {
        const { code, amount, expiresAt } = req.body;

        const discount = new Discount({
            code,
            amount,
            expiresAt,
        });

        try {
            await discount.save();
            res.status(200).send(discount);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.delete("/api/discount/:discountId", async (req, res) => {
        const { discountId } = req.params;

        try {
            await Discount.deleteOne({ _id: discountId });
            res.status(200).send("Successful remove");
        } catch (err) {
            console.error(err);
            res.send(500).send("Internal Server Error");
        }
    });
};
