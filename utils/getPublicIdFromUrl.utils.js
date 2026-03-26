export const getPublicIdFromUrl = (url,location) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return `${location}/${filename.split('.')[0]}`;
};