
import { Message } from "firebase-admin/lib/messaging/messaging-api"
import { FirebaseMessageTokenRepository } from "../../db/mongo"
import admin from "../../third/firebase/Firebase"
import { FirebaseMessageToken } from "../model/notification"
class FirebaseMessageService {
    async storeFMToken(userId: string, tokenId: string) {
        const userStoredToken = await this.getFMToken(userId)
        if(!userStoredToken) {
            const fmToken: FirebaseMessageToken = {
                token: tokenId,
                userId: userId
            }
            FirebaseMessageTokenRepository.insertOne(fmToken)   
        }
    }

    async sendMessage(title: string, body: string, token: string) {
        const message: Message = {
            token: token,
            notification: {
                body: body,
                title: title,
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-kIT1Fa9RSYgIDsOwQ46BuWmQI12y-wqrmQ&s'
            }
        }
        try {
            const response = await admin.messaging().send(message);
            console.log('Notification sent successfully:', response);
          } catch (error) {
            console.error('Error sending notification:', error);
          }
    }
    

    async getFMToken(userId: string) {
        const fmToken = await FirebaseMessageTokenRepository.findOne({
            userId: userId
        })
        if(fmToken) return fmToken.token
        return undefined
    }

}
export default new FirebaseMessageService()