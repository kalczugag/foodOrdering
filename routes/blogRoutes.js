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

        const post = new Post({
            title,
            desc,
            img,
        });

        try {
            await post.save();
            res.status(200).send(post);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.put("/api/posts", requireAdmin, async (req, res) => {
        const postToUpdate = req.body._id;
        const { title, desc, img } = req.body;

        try {
            const updatedPosts = await Post.findByIdAndUpdate(
                postToUpdate,
                {
                    $set: { title, desc, img },
                },
                { new: true }
            );

            res.status(200).send(updatedPosts);
        } catch (err) {
            res.status(500).send({ error: err.message });
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
