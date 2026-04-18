const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const notes = document.getElementById("notes");

// LOAD DATA
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
notes.value = localStorage.getItem("notes") || "";

// SAVE TASKS
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// RENDER TASKS
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-700 p-2 rounded";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = task.done ? "line-through text-gray-400" : "";

    // TOGGLE BUTTON
    span.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    // DELETE BUTTON
    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.className = "text-red-400 hover:text-red-600";

    btn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

// ADD TASK
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    done: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// SAVE NOTES
notes.addEventListener("input", () => {
  localStorage.setItem("notes", notes.value);
});

// INIT
renderTasks();