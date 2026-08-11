
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { ApiError } from "./ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (!response) {
      throw new ApiError(
        400,
        "Something went wrong while uploading profile on Cloudinary"
      );
    }

    // Upload successful → delete temporary local file
    await fs.unlink(localFilePath);

    return response;
  } catch (error) {
    console.log("CLOUDINARY UPLOAD ERROR:", error.message);

    // Try to delete temporary file if it still exists
    try {
      await fs.unlink(localFilePath);
    } catch (unlinkError) {
      console.log("TEMP FILE DELETE ERROR:", unlinkError.message);
    }

    return null;
  }
};

export { uploadOnCloudinary };

