let currentProject = null;
let userId = Telegram.WebApp.initDataUnsafe.user?.id || "demo";

function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects_" + userId)) || [];
  const list = document.getElementById("project-list");
  list.innerHTML = "";
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.onclick = () => enterProject(project.name);
    list.appendChild(li);
  });
}

function saveProjects(projects) {
  localStorage.setItem("projects_" + userId, JSON.stringify(projects));
}

function createProject() {
  const name = document.getElementById("project-name").value.trim();
  if (!name) return alert("Введите название проекта");
  const projects = JSON.parse(localStorage.getItem("projects_" + userId)) || [];
  if (projects.find(p => p.name === name)) return alert("Проект уже существует");
  projects.push({ name });
  saveProjects(projects);
  loadProjects();
  document.getElementById("project-name").value = "";
}

function enterProject(name) {
  currentProject = name;
  document.getElementById("project-view").style.display = "none";
  document.getElementById("task-view").style.display = "block";
  document.getElementById("current-project-name").textContent = name;
  loadTasks();
}

function backToProjects() {
  document.getElementById("project-view").style.display = "block";
  document.getElementById("task-view").style.display = "none";
  currentProject = null;
  loadProjects();
}

function getTaskKey() {
  return "tasks_" + userId + "_" + currentProject;
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(getTaskKey())) || [];
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTask(index);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function saveTasks(tasks) {
  localStorage.setItem(getTaskKey(), JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("task-input");
  const task = input.value.trim();
  if (!task) return;
  const tasks = JSON.parse(localStorage.getItem(getTaskKey())) || [];
  tasks.push(task);
  saveTasks(tasks);
  loadTasks();
  input.value = "";
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem(getTaskKey())) || [];
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

window.onload = () => {
  loadProjects();
};
