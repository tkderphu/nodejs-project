import { FlowerRepository } from "../../db/mongo"
import { getUserLoggined } from "../framework/common/auth"

class FlowerController {
    getFlower(req: any, res: any, next: any) {
         FlowerRepository.findOne({
            userId: getUserLoggined(req).userId
        }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }
}
export default new FlowerController()