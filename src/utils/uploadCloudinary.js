import cloudinary from 'cloudinary';

cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOIDINARY_CLOUD_NAME,
    api_key: process.env.CLOIDINARY_API_KEY,
    api_secret: process.env.CLOIDINARY_API_SECRET
});

export function uploadToCloudinary(filePath) {
    return cloudinary.v2.uploader.upload(filePath);
}
