const Multer = require("multer");
const sharp = require("sharp");
const keys = require("../config/keys");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const storage = new Storage({
    projectId: keys.googleProjectId,
    keyFilename: path.join(__dirname, "../food-dev-391911-228a3cd0a34d.json"),
});
const bucket = storage.bucket("adsfadf231");

module.exports = (app) => {
    app.post("/api/image", multer.single("imgfile"), async (req, res) => {
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

    app.delete("/api/image/", async (req, res) => {});
};
