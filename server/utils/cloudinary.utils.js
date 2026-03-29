import cloudinary from '../config/cloudinary.config.js';
import streamifier from "streamifier";
export const deletePicture = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    const parts = imageUrl.split("/");
    const publicIdWithExt = parts[parts.length - 1];
    const publicId = `profile_photos/${publicIdWithExt.split(".")[0]}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    return null;
  }
};
export const uploadPicture = (buffer) => {
  return new Promise((resolve, reject) => {
    if (!buffer) return reject("No buffer provided");
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile_photos" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return reject(error);
        }
        resolve(result.secure_url); 
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};