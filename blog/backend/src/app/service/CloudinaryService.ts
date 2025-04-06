import cloudinary from "../../third/cloudinary/Cloudinary";

class CloudinaryService {
    async upload(fileBuffer: Buffer){
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result?.url);
            }
          );
          stream.end(fileBuffer);
        });
      };

}

export default new CloudinaryService