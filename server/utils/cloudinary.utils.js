import { cloudinary } from '../config/cloudinary.config.js';
export const getPublicIdFromUrl = (url, location) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const nameWithoutExtension = filename.substring(0, filename.lastIndexOf('.'));
    return `${location}/${nameWithoutExtension}`;
};
export const deletePicture = async (url, location) => {
    try {
        const publicId = getPublicIdFromUrl(url, location);
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok' || result.result === 'not found') {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};
export const uploadPicture = async (file, folder) => {
    try {
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(file.buffer);
        });
        return uploadResult.secure_url || null;
    } catch (error) {
        return null;
    }
};