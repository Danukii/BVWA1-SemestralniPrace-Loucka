const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const notes = document.getElementById("notes");

const calendar = document.getElementById("calendar");
const monthLabel = document.getElementById("monthLabel");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const taskDate = document.getElementById("taskDate");

let currentDate = new Date();
let selectedDate = null;

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

  let filteredTasks = tasks;

  if (selectedDate) {
    filteredTasks = tasks.filter(t => t.date === selectedDate);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-700 p-2 rounded";

    const span = document.createElement("span");
    span.textContent = task.text + (task.date ? ` (${task.date})` : "");
    span.className = task.done ? "line-through text-gray-400" : "";

    span.addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.className = "text-red-400";

    btn.addEventListener("click", () => {
      tasks = tasks.filter(t => t !== task);
      saveTasks();
      renderTasks();
      renderCalendar();
    });

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}


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

// ADD TASK
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    done: false,
    date: taskDate.value || null
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
});


// SAVE NOTES
notes.addEventListener("input", () => {
  localStorage.setItem("notes", notes.value);
});


// RENDER CALENDAR
function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthLabel.textContent =
    currentDate.toLocaleDateString("cs-CZ", {
      month: "long",
      year: "numeric"
    });

  // prázdné buňky
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    calendar.innerHTML += `<div></div>`;
  }

  // dny
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const hasTask = tasks.some(t => t.date === dateStr);

    const div = document.createElement("div");
    div.textContent = day;

    div.className = `
      p-2 rounded cursor-pointer
      ${hasTask ? "bg-purple-600" : "bg-gray-700"}
      ${selectedDate === dateStr ? "ring-2 ring-white" : ""}
      hover:bg-purple-500
    `;

    div.addEventListener("click", () => {
      selectedDate = dateStr;
      renderCalendar();
      renderTasks();
    });

    calendar.appendChild(div);
  }
}

prevMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});



// INIT
renderTasks();
renderCalendar();