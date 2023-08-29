const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const User = mongoose.model("users");

module.exports = (app) => {
    app.put("/api/current_user", requireLogin, async (req, res) => {
        const userToUpdate = req.user._id;
        const { username, email, city, street, postal, phone } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                userToUpdate,
                {
                    $set: {
                        username,
                        email,
                        address: {
                            city,
                            street,
                            postal,
                        },
                        phone,
                    },
                },
                { new: true }
            );

            res.status(200).send(updatedUser);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });
};
