
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ТВОЙ_API_KEY",
  authDomain: "ТВОЙ_PROJECT_ID.firebaseapp.com",
  projectId: "ТВОЙ_PROJECT_ID",
  storageBucket: "ТВОЙ_PROJECT_ID.appspot.com",
  messagingSenderId: "ТВОЙ_SENDER_ID",
  appId: "ТВОЙ_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addProjectToFirestore(name, userId) {
  try {
    await addDoc(collection(db, "projects"), {
      name,
      owner: userId,
      createdAt: new Date()
    });
  } catch (e) {
    console.error("Ошибка при добавлении проекта:", e);
  }
}
