import path from "path";
import multer from "multer";
const photoStorage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (request, file, cb) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  },
});
export const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (request, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file formate" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 },
});