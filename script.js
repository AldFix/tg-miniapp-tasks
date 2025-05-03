const firebaseConfig = {
  apiKey: "AIzaSyB-SWL22l5mvvzJvhpBR6tUkTtifgSfsZM",
  authDomain: "telegramminiapptasks.firebaseapp.com",
  databaseURL: "https://telegramminiapptasks-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "telegramminiapptasks",
  storageBucket: "telegramminiapptasks.appspot.com",
  messagingSenderId: "95276291",
  appId: "1:95276291:web:2ca466b0ea6c37d648ed36",
  measurementId: "G-G1TM0NNT4B"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const tg = window.Telegram.WebApp;
tg.expand();

const userId = tg.initDataUnsafe.user?.id || "unknown";

function createProject() {
  const name = document.getElementById("project-name").value.trim();
  if (!name) return;

  const newRef = db.ref("projects").push();
  newRef.set({
    name,
    createdBy: userId,
    users: {
      [userId]: true
    }
  }).then(() => {
    alert("Проект создан");
    document.getElementById("project-name").value = "";
    loadProjects();
  });
}

function loadProjects() {
  db.ref("projects").once("value", (snapshot) => {
    const container = document.getElementById("project-list");
    container.innerHTML = "";
    snapshot.forEach((child) => {
      const data = child.val();
      if (data.users && data.users[userId]) {
        const div = document.createElement("div");
        div.className = "project-item";
        div.innerText = data.name;
        container.appendChild(div);
      }
    });
  });
}

window.addEventListener("load", loadProjects);
