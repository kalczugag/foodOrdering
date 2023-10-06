const Multer = require("multer");
const sharp = require("sharp");
const keys = require("../config/keys");
const NodeCache = require("node-cache");
const axios = require("axios");
const { URL } = require("url");
const { Storage } = require("@google-cloud/storage");
const cache = new NodeCache();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const storage = new Storage({
    credentials: {
        projectId: keys.googleProjectId,
        client_email: keys.googleClientEmail,
        private_key: keys.googlePrivateKey,
    },
});
const bucket = storage.bucket(keys.googleBucketName);
module.exports = (app) => {
    app.get("/api/images/:imageName", async (req, res) => {
        const { imageName } = req.params;

        // Check if the image is in cache
        const cachedImage = cache.get(imageName);
        if (cachedImage) {
            console.log("Image fetched from cache:", imageName);
            return res.send(cachedImage);
        }

        // If not in cache, fetch the image from Google Cloud Storage
        try {
            const response = await axios.get(
                `https://storage.googleapis.com/${keys.googleBucketName}/${imageName}`,
                { responseType: "arraybuffer" } // Treat the response as binary data
            );

            // Cache the image for future requests (expires in 1 hour, adjust as needed)
            cache.set(imageName, response.data, 3600);

            console.log(
                "Image fetched from Google Cloud Storage and cached:",
                imageName
            );
            res.set("Content-Type", "image/jpeg"); // Adjust the content type based on your image type
            return res.send(response.data);
        } catch (error) {
            console.error("Error fetching image:", error);
            return res.status(500).send("Error fetching image");
        }
    });

    app.post("/api/images", multer.single("imgfile"), async (req, res) => {
        try {
            if (req.file) {
                const compressedImageBuffer = await sharp(req.file.buffer)
                    .resize({ width: 200, height: 200 })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                const blob = bucket.file(req.file.originalname);
                const blobStream = blob.createWriteStream();

                blobStream.on("finish", async () => {
                    const [url] = await blob.getSignedUrl({
                        action: "read",
                        expires: "01-01-2030",
                    });

                    res.status(200).send({ imageUrl: url });
                });
                blobStream.end(compressedImageBuffer);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.delete("/api/images/:imageUrl", async (req, res) => {
        const { imageUrl } = req.params;

        if (!imageUrl) {
            return res.status(400).send("Missing imageUrl parameter");
        }

        try {
            const url = new URL(imageUrl);
            const pathnameParts = url.pathname.split("/");
            const filename = pathnameParts[pathnameParts.length - 1];

            const [files] = await storage.bucket("adsfadf231").getFiles();

            let matchFile = null;
            for (const file of files) {
                if (file.name === filename) {
                    matchFile = file;
                    break;
                }
            }

            if (matchFile) {
                await matchFile.delete();
            }

            res.status(204).send(
                "Successfull delete from Google Cloud Storage"
            );
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
};
