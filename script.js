
let tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe?.user;
document.getElementById("username").innerText = user?.first_name || "пользователь";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

const userId = user?.id;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks.filter(t => t.user_id === userId);
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = loadTasks();
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = \`
            <span class="\${task.completed ? 'done' : ''}">\${task.text} (\${task.date})</span>
            <button onclick="toggleTask('\${task.id}')">✅</button>
            <button onclick="deleteTask('\${task.id}')">❌</button>
        \`;
        taskList.appendChild(li);
    });
}

function addTask(text, date) {
    const tasks = loadTasks();
    tasks.push({
        id: Date.now().toString(),
        user_id: userId,
        text,
        date,
        completed: false
    });
    saveTasks(tasks);
    renderTasks();
}

function toggleTask(id) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(id) {
    let tasks = loadTasks();
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    renderTasks();
}

taskForm.addEventListener("submit", e => {
    e.preventDefault();
    addTask(taskInput.value, taskDate.value);
    taskInput.value = "";
    taskDate.value = "";
});

renderTasks();
