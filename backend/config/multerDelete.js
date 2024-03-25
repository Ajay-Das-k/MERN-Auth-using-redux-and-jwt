import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const publicPath = path.join(__dirname, "backend", "public");

const deleteImage = (oldImageFilename) => {
  fs.unlink(
    path.join(publicPath, "images", "userProfile", oldImageFilename),
    (err) => {
      if (err) {
        console.error(`Error deleting old image: ${err.message}`);
      } else {
        console.log("Old image deleted successfully");
      }
    }
  );
};

export default deleteImage; // Exporting the function using ES6 module syntax
