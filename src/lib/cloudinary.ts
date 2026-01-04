
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadToCloudinary = async (file: File | Blob, folder: string = 'venkateshwara/uploads'): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Upload options with async mode to handle incoming transformations
            // Cloudinary account has incoming transformations (q_auto) enabled
            // which requires async:true to prevent synchronous transformation errors
            const uploadOptions: any = {
                folder: folder,
                resource_type: 'auto',
                use_filename: true,
                unique_filename: true,
                // CRITICAL: async:true required when account has incoming transformations
                async: true,
            };

            const stream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        // With async:true, result will be returned immediately
                        // The actual processing happens in the background
                        resolve(result);
                    }
                }
            );

            stream.write(buffer);
            stream.end();
        } catch (error) {
            console.error('Upload preparation error:', error);
            reject(error);
        }
    });
};
