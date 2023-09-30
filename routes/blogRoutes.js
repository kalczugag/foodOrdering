const requireAdmin = require("../middlewares/requireAdmin");
const mongoose = require("mongoose");

const Post = mongoose.model("post");

module.exports = (app) => {
    app.get("/api/posts", async (req, res) => {
        try {
            const posts = await Post.find({});

            res.status(200).send(posts);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get("/api/posts/:postId", async (req, res) => {
        const postId = req.params.postId;

        try {
            const post = await Post.findById(postId);

            res.status(200).send(post);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post("/api/posts", requireAdmin, async (req, res) => {
        const { title, desc, date, img } = req.body;
        console.log(title, desc, date, img);

        const post = new Post({
            title,
            desc,
            date,
            img,
        });

        try {
            await post.save();
            res.status(200).send("Successful added post").redirect("/blog");
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.delete("/api/posts/:postId", async (req, res) => {
        const { postId } = req.params;

        try {
            await Post.deleteOne({ _id: postId });
            res.status(200).send("Successful remove");
        } catch (err) {
            console.error(err);
            res.send(500).send("Internal Server Error");
        }
    });
};
