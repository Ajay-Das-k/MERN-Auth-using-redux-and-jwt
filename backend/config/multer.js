import express from "express";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const __dirname = path.resolve();

const app = express();

const publicPath = path.join(__dirname, "backend", "public");
app.use(express.static(publicPath));

const createStorage = (folderName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath = path.join(publicPath, "images", folderName);
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });
};

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(publicPath, "userRaw");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const createMulter = (storage) => {
  return multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedFormats = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/avif",
      ];

      if (allowedFormats.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only .png, .jpg, .jpeg, .webp, and .avif formats are allowed!"
          )
        );
      }
    },
  });
};

const uploadUser = createMulter(userStorage);

const userImgResize = async (req, res, next) => {
  try {
    if (!req.file) {
      // No file uploaded, proceed to the next middleware/controller
      return next();
    }

    const imagePath = path.join(
      publicPath,
      "images",
      "userProfile",
      req.file.filename
    );
    console.log("Image path:", imagePath);

    const sharpInstance = sharp(req.file.path);
    await sharpInstance
      .resize(300, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(imagePath);

    // Destroy the sharp instance to release resources
    sharpInstance.destroy();

    // Use fs.promises.unlink for asynchronous file deletion
    await fs.promises.unlink(req.file.path);
    console.log(`File ${req.file.filename} deleted successfully.`);
  } catch (error) {
    console.error(`Error processing image: ${error.message}`);
  }

  next();
};

export { uploadUser, userImgResize };
