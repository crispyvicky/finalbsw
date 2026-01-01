
import { uploadToCloudinary } from "@/lib/cloudinary";

export const uploadImage = async (file: File) => {
    try {
        const result = await uploadToCloudinary(file, 'bravoo_uploads');
        return result.secure_url;
    } catch (error) {
        console.error("Upload failed", error);
        throw error;
    }
}
