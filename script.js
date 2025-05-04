
let projects = [];
let currentProjectId = null;

function renderProjects() {
  const list = document.getElementById("project-list");
  list.innerHTML = "";
  projects.forEach((proj, index) => {
    const li = document.createElement("li");
    li.textContent = proj.name;
    li.onclick = () => openProject(index);
    list.appendChild(li);
  });
}

function createProject() {
  const name = document.getElementById("new-project-name").value;
  if (!name) return;
  projects.push({ name, tasks: [] });
  document.getElementById("new-project-name").value = "";
  renderProjects();
}

function openProject(index) {
  currentProjectId = index;
  document.getElementById("main").classList.add("hidden");
  document.getElementById("project-view").classList.remove("hidden");
  document.getElementById("project-title").textContent = projects[index].name;
  renderTasks();
}

function backToMain() {
  document.getElementById("project-view").classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
}

function renderTasks() {
  const tbody = document.querySelector("#task-table tbody");
  tbody.innerHTML = "";
  const tasks = projects[currentProjectId].tasks;
  tasks.forEach((task, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = \`
      <td>\${task.text}</td>
      <td>\${task.tags.join(', ')}</td>
      <td>\${task.status}</td>
      <td><button onclick="deleteTask(\${idx})">Удалить</button></td>
    \`;
    tbody.appendChild(tr);
  });
}

function addTask() {
  const text = document.getElementById("new-task").value;
  if (!text) return;
  projects[currentProjectId].tasks.push({ text, tags: [], status: "в очереди" });
  document.getElementById("new-task").value = "";
  renderTasks();
}

function deleteTask(index) {
  if (!confirm("Удалить задачу?")) return;
  projects[currentProjectId].tasks.splice(index, 1);
  renderTasks();
}

