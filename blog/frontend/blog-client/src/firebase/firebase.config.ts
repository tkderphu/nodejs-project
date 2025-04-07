
import { messaging, getToken, onMessage } from "./firebase";
import { UseDispatch } from "react-redux";
import api from "../interceptor/AxiosInterceptor";
export const getFcmToken = async (userId?: string) => {
  const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  // if (userId) return undefined
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  });;
  //store firebase
  api.put('/firebase/message/token', {token}).then(res => {
    console.log("store token ok")
  }).catch(err => {
    console.error("Store token error: ", err)
  })
  console.log("token: ", token)
  return token;
}
export const firebaseListenerForMessages = () => {
  onMessage(messaging, (payload: any) => {
    // document.title = 'Bạn có thông báo mới'
    console.log('vcl')
    new Notification(payload.notification.title, {
      body: payload.notification.body,
    });
  });
};