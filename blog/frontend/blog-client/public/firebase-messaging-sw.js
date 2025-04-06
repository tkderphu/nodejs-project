importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js")
// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAwxXEPLwQ5UH1tYzyQpvatz4cbL0Kn7aQ",
    authDomain: "notification-9a403.firebaseapp.com",
    projectId: "notification-9a403",
    storageBucket: "notification-9a403.firebasestorage.app",
    messagingSenderId: "745120107950",
    appId: "1:745120107950:web:8034b68efb529987d0cc3f",
    measurementId: "G-KW182QEPWY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(payload => {
    console.log("Received background message ", payload);
    
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/vite.svg",
        // requireInteraction: true // Keeps notification visible until user interacts
    }).then(() => {
        console.log("Notification shown successfully");
    }).catch((error) => {
        console.error("Error showing notification:", error);
    });
});
