import { FlowerRepository, TransactionRepository } from "../../db/mongo"
import { Transaction } from "../model/flower"

class TransactionService {
    async addFlower(type: "UNLOCK_ARTICLE" | "VNPAY" = "VNPAY", numberFlower: number, fromUserId?: string, toUserId?: string, postId?: string) {


        if (type == 'UNLOCK_ARTICLE') {
            const tran1: Transaction = {
                createdAt: new Date(),
                message: "Bạn đã mở khóa bài viết với id là: " + postId,
                numberFlower: numberFlower,
                userId: fromUserId
            }
            const trans2: Transaction = {
                createdAt: new Date(),
                message: "Bạn đã nhận được hoa từ người dùng: " + fromUserId,
                numberFlower: numberFlower,
                userId: toUserId
            }

            await this.withDrawFlower(numberFlower, fromUserId)
            await FlowerRepository.updateOne({
                "userId": fromUserId
            }, {
                $inc: {
                    "numberFlower": numberFlower
                }
            })
            await TransactionRepository.insertMany([tran1, trans2])
        } else {
            await TransactionRepository.insertOne({
                createdAt: new Date(),
                message: "Bạn đã nạp hoa",
                numberFlower: numberFlower,
                userId: toUserId
            })
        }



    }
    async withDrawFlower(numberFlower: number, userId?: string) {
        const flower: any = await FlowerRepository.findOne({
            userId: userId
        })
        if (flower) {
            if (flower.numberFlower < numberFlower) {
                throw new Error("Bạn không đủ hoa")
            }
            await FlowerRepository.updateOne({
                userId: userId
            }, {
                $set: {

                    "numberFlower": flower.numberFlower - numberFlower
                }
            })
        }
    }
    getListTransaction(userId: string) {
        return TransactionRepository.find({
            "userId": userId
        }).toArray()
    }


}
export default new TransactionService()