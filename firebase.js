
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-SWL22l5mvvzJvhpBR6tUkTtifgSfsZM",
  authDomain: "telegramminiapptasks.firebaseapp.com",
  databaseURL: "https://telegramminiapptasks-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "telegramminiapptasks",
  storageBucket: "telegramminiapptasks.firebasestorage.app",
  messagingSenderId: "95276291",
  appId: "1:95276291:web:2ca466b0ea6c37d648ed36",
  measurementId: "G-G1TM0NNT4B"
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
