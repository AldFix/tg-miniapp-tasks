
let projects = [];
let currentProject = null;

function renderProjects() {
  const list = document.getElementById('project-list');
  list.innerHTML = '';
  projects.forEach((p, index) => {
    const li = document.createElement('li');
    li.textContent = p.name;
    li.classList.add('clickable');
    li.onclick = () => openProject(index);
    list.appendChild(li);
  });
}

function createProject() {
  const name = document.getElementById('new-project-name').value.trim();
  if (!name) return;
  projects.push({ name, tasks: [], users: [] });
  document.getElementById('new-project-name').value = '';
  renderProjects();
}

function openProject(index) {
  currentProject = index;
  document.getElementById('projects-view').classList.add('hidden');
  document.getElementById('tasks-view').classList.remove('hidden');
  document.getElementById('project-title').textContent = projects[index].name;
  renderTasks();
}

function goBack() {
  currentProject = null;
  document.getElementById('projects-view').classList.remove('hidden');
  document.getElementById('tasks-view').classList.add('hidden');
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  projects[currentProject].tasks.forEach((task, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.tags?.join(', ') || ''}</td>
      <td>${task.status || 'в очереди'}</td>
      <td><button onclick="deleteTask(${i})">🗑</button></td>
    `;
    list.appendChild(row);
  });
}

function addTask() {
  const name = document.getElementById('new-task-name').value.trim();
  if (!name) return;
  projects[currentProject].tasks.push({ name, tags: [], status: 'в очереди' });
  document.getElementById('new-task-name').value = '';
  renderTasks();
}

function deleteTask(index) {
  if (confirm('Удалить задачу?')) {
    projects[currentProject].tasks.splice(index, 1);
    renderTasks();
  }
}

function inviteUser() {
  const id = document.getElementById('invite-id').value.trim();
  if (!id) return;
  projects[currentProject].users.push(id);
  alert('Пользователь приглашён!');
}

