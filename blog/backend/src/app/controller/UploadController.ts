import { Request, Response } from "express";
import CloudinaryService from "../service/CloudinaryService";

class UploadController {

    uploadFile(req: Request, res: Response, next: any) {
        try {
            if(!req.file) {
                throw new Error("file not found")
            }
            CloudinaryService.upload(req.file.buffer).then(resp => {
                res.status(200).send(resp) //send url of image when file is uploaded successfully
            }).catch(err => {
                next(err)
            })
        } catch(err) {
            next(err)
        }
    }

}


export default new UploadController