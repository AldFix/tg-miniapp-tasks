let mockData = {
  users: {
    "123456789": {
      name: "Тестовый юзер",
      projects: ["proj1", "proj2"]
    }
  },
  projects: {
    "proj1": {
      name: "Маркетинг 2025",
      members: ["123456789"]
    },
    "proj2": {
      name: "Личный проект",
      members: ["123456789"]
    }
  }
};

const tg = window.Telegram.WebApp;
tg.expand();

const userId = tg.initDataUnsafe.user?.id || "123456789"; // Пока для теста

function renderProjects() {
  const user = mockData.users[userId];
  const list = document.getElementById("project-list");
  list.innerHTML = "";

  user.projects.forEach(projId => {
    const proj = mockData.projects[projId];
    const div = document.createElement("div");
    div.className = "project";
    div.innerText = proj.name;
    list.appendChild(div);
  });
}

function createProject() {
  const name = document.getElementById("projectNameInput").value.trim();
  if (!name) return alert("Введите название проекта");

  const newId = "proj" + Math.floor(Math.random() * 10000);
  mockData.projects[newId] = {
    name: name,
    members: [userId]
  };
  mockData.users[userId].projects.push(newId);
  document.getElementById("projectNameInput").value = "";
  renderProjects();
}

renderProjects();