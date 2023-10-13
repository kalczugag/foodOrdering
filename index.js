const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const keys = require("./config/keys");
require("./models/User");
require("./models/Product");
require("./models/Order");
require("./models/Cart");
require("./models/Event");
require("./models/Post");
require("./models/Discount");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());
app.use("/api/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/productsRoutes")(app);
require("./routes/ordersRoutes")(app);
require("./routes/cartRoutes")(app);
require("./routes/eventRoutes")(app);
require("./routes/blogRoutes")(app);
require("./routes/discountRoutes")(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build", { maxAge: 86400000 * 30 }));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
