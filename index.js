document.getElementById('createProjectBtn').addEventListener('click', createProject);

function createProject() {
  const projectName = document.getElementById('projectName').value.trim();
  if (!projectName) {
    alert('Введите название проекта');
    return;
  }

  // Получение Telegram ID пользователя
  const telegramUserId = Telegram.WebApp.initDataUnsafe.user.id;

  // Сохранение проекта в Firebase Realtime Database
  const projectRef = database.ref('projects').push();
  projectRef.set({
    name: projectName,
    owner: telegramUserId,
    createdAt: Date.now()
  })
  .then(() => {
    alert('Проект успешно создан');
    document.getElementById('projectName').value = '';
  })
  .catch((error) => {
    console.error('Ошибка при создании проекта:', error);
    alert('Ошибка при создании проекта');
  });
}
