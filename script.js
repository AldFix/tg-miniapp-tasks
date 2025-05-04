// Firebase config
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

let currentProjectId = null;

function $(id) {
  return document.getElementById(id);
}

function addProject() {
  const name = $('new-project-name').value.trim();
  if (!name) return;
  const project = db.ref('projects').push({ name });
  $('new-project-name').value = '';
}

function renderProjects(snapshot) {
  const list = $('project-list');
  list.innerHTML = '';
  snapshot.forEach(projectSnap => {
    const li = document.createElement('li');
    li.textContent = projectSnap.val().name;
    li.onclick = () => openProject(projectSnap.key, projectSnap.val().name);
    list.appendChild(li);
  });
}

function openProject(id, name) {
  currentProjectId = id;
  $('project-title').textContent = name;
  $('project-list-view').classList.add('hidden');
  $('project-detail-view').classList.remove('hidden');
  db.ref('tasks/' + id).on('value', renderTasks);
}

function goBack() {
  $('project-detail-view').classList.add('hidden');
  $('project-list-view').classList.remove('hidden');
  db.ref('tasks/' + currentProjectId).off();
}

function addTask() {
  const name = $('new-task-name').value.trim();
  if (!name || !currentProjectId) return;
  db.ref('tasks/' + currentProjectId).push({
    name,
    tags: '',
    status: 'в очереди',
    done: false
  });
  $('new-task-name').value = '';
}

function renderTasks(snapshot) {
  const tbody = $('task-list');
  tbody.innerHTML = '';
  snapshot.forEach(taskSnap => {
    const task = taskSnap.val();
    const tr = document.createElement('tr');

    const tdCheck = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.onchange = () => {
      db.ref('tasks/' + currentProjectId + '/' + taskSnap.key).update({ done: checkbox.checked });
    };
    tdCheck.appendChild(checkbox);

    const tdName = document.createElement('td');
    tdName.textContent = task.name;

    const tdTags = document.createElement('td');
    tdTags.textContent = task.tags || '';

    const tdStatus = document.createElement('td');
    tdStatus.textContent = task.status || '';

    const tdDelete = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑';
    delBtn.onclick = () => {
      db.ref('tasks/' + currentProjectId + '/' + taskSnap.key).remove();
    };
    tdDelete.appendChild(delBtn);

    tr.appendChild(tdCheck);
    tr.appendChild(tdName);
    tr.appendChild(tdTags);
    tr.appendChild(tdStatus);
    tr.appendChild(tdDelete);
    tbody.appendChild(tr);
  });
}

function inviteUser() {
  const username = $('invite-username').value.trim();
  if (username && currentProjectId) {
    alert(`Пользователь @${username} приглашён в проект!`);
  }
}

db.ref('projects').on('value', renderProjects);
