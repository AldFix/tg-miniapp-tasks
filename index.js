
import { addProjectToFirestore } from './firebase.js';

window.Telegram.WebApp.ready();

document.getElementById("createProjectBtn").addEventListener("click", async () => {
  const projectName = document.getElementById("projectName").value;
  if (!projectName) return alert("Введите название проекта");

  const userId = Telegram.WebApp.initDataUnsafe?.user?.id;
  if (!userId) return alert("Не удалось определить пользователя");

  await addProjectToFirestore(projectName, userId);

  alert("Проект создан!");
});
