import cloudinary from '../config/cloudinary.config.js';
import streamifier from "streamifier";
export const uploadPicture = (buffer) => {
  return new Promise((resolve, reject) => {
    if (!buffer) return reject("No buffer provided");

    const stream = cloudinary.uploader.upload_stream(
      { folder: "velora" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return reject(error);
        }
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
export const deletePicture = async (public_id) => {
  try {
    if (!public_id) return;
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return null;
  }
};