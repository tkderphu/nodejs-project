
import { messaging, getToken, onMessage } from "./firebase";
export const getFcmToken = async (userId?: string) => {
    console.log("user: ", userId)
    if (userId) return undefined
    const token  = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });;

    //update => 
    console.log(token)

    return token;
}
export const firebaseListenerForMessages = () => {
    onMessage(messaging, (payload: any) => {
      console.log("Message received:", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });
};