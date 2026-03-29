import multer from "multer";
const photoStorage = multer.memoryStorage();
export const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, 
});