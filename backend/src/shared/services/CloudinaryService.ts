import config from "@/config"
import {v2 as cloudinary} from "cloudinary"
import { Service } from "typedi"

@Service()
export class CloudinaryService {
    cloudinaryInstance: typeof cloudinary
    constructor() {
       cloudinary.config({
            cloud_name: config.cloudinary_cloud_name,
            api_key: config.cloudinary_api_key,
            api_secret: config.cloudinary_api_secret
        })

        this.cloudinaryInstance = cloudinary
    }

    async upload(file: string) {
        await this.cloudinaryInstance.uploader.upload(file)
    }

}