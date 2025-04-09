import { getUserLoggined } from "../framework/common/auth"
import GalleryService from "../service/GalleryService"

class GalleryController {
    getListGallery(req: any, res: any, next: any) {
        GalleryService.getListGallery(getUserLoggined(req).userId)
        .then(resp => {
            res.satus(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }
}
export default new GalleryController()