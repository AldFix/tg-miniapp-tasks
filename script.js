
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        return JSON.parse(localStorage.getItem("tasks") || "[]");
    }

    function renderTasks() {
        taskList.innerHTML = "";
        const tasks = loadTasks();
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.done) li.classList.add("done");
            li.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                saveTasks(tasks);
                renderTasks();
            });
            taskList.appendChild(li);
        });
    }

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const tasks = loadTasks();
        tasks.push({ text: taskInput.value, done: false });
        saveTasks(tasks);
        taskInput.value = "";
        renderTasks();
    });

    renderTasks();
});
