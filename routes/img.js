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
    app.post("/api/upload", multer.single("imgfile"), async (req, res) => {
        console.log("Made it /upload");
        try {
            if (req.file) {
                console.log("File found, trying to upload...");

                const compressedImageBuffer = await sharp(req.file.buffer)
                    .resize({ width: 200, height: 200 }) // Resize the image (adjust dimensions as needed)
                    .jpeg({ quality: 80 }) // Set JPEG quality (adjust as needed)
                    .toBuffer();

                const blob = bucket.file(req.file.originalname);
                const blobStream = blob.createWriteStream();

                blobStream.on("finish", () => {
                    res.status(200).send("Success");
                    console.log("Success");
                });
                blobStream.end(compressedImageBuffer);
            } else throw "error with img";
        } catch (error) {
            res.status(500).send(error);
        }
    });
};
