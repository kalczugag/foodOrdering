const Multer = require("multer");
const sharp = require("sharp");
const keys = require("../config/keys");
const path = require("path");
const { URL } = require("url");
const { Storage } = require("@google-cloud/storage");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const storage = new Storage({
    projectId: keys.googleProjectId,
    keyFilename: path.join(__dirname, keys.googleKeyFile),
});
const bucket = storage.bucket(keys.googleBucketName);

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

    app.delete("/api/image/:imageUrl", async (req, res) => {
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
