const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const notes = document.getElementById("notes");

// calendar
const calendar = document.getElementById("calendar");
const monthLabel = document.getElementById("monthLabel");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const taskDate = document.getElementById("taskDate");

let currentDate = new Date();
let selectedDate = null;

// přepínání motivu
const body = document.getElementById("appBody");
const themeToggle = document.getElementById("themeToggle");

let theme = localStorage.getItem("theme") || "neon";

// priority úkolů
const taskPriority = document.getElementById("taskPriority");



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

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");

    // PRIORITY BARVA
    let priorityColor = "";
    if (task.priority === "high") priorityColor = "border-red-500";
    if (task.priority === "medium") priorityColor = "border-yellow-400";
    if (task.priority === "low") priorityColor = "border-green-400";

    li.className = `flex justify-between items-center bg-gray-700 p-2 rounded border-l-4 ${priorityColor}`;

    const span = document.createElement("span");
    span.textContent = task.text + (task.date ? ` (${task.date})` : "");
    span.className = task.done ? "line-through text-gray-400" : "";

    // TOGGLE DONE
    span.addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    // EDIT BUTTON (musí být vytvořen pro každý task zvlášť!)
    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.className = "text-blue-400 mr-2";

    editBtn.addEventListener("click", () => {
      const newText = prompt("Upravit úkol:", task.text);

      if (newText !== null && newText.trim() !== "") {
        task.text = newText;
        saveTasks();
        renderTasks();
        showToast("Úkol upraven", "success");
      }
    });

    // DELETE BUTTON
    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.className = "text-red-400 hover:text-red-600";

    btn.addEventListener("click", () => {
      tasks = tasks.filter(t => t !== task);
      saveTasks();
      renderTasks();
      renderCalendar();
      showToast("Úkol smazán", "error");
    });

    const actions = document.createElement("div");
    actions.className = "flex gap-2";

    actions.appendChild(editBtn);
    actions.appendChild(btn);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(btn);
    li.appendChild(actions);
    taskList.appendChild(li);
    updateProgress();
  });
}


// ADD TASK
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === "") return;

  updateProgress();

  tasks.push({
    text: taskInput.value,
    done: false,
    date: taskDate.value || null,
    priority: taskPriority.value
  });

  taskInput.value = "";
  taskDate.value = "";

  saveTasks();
  renderTasks();
  renderCalendar();
  showToast("Úkol přidán", "success");
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
      ${hasTask ? "bg-purple-600 shadow-lg shadow-purple-500/40" : "bg-gray-700"}
      ${selectedDate === dateStr ? "ring-2 ring-white" : ""}
      hover:bg-purple-500
    `;

    div.addEventListener("click", () => {
      selectedDate = dateStr;
      taskDate.value = dateStr;
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

// toast notifikace
const toastContainer = document.getElementById("toastContainer");

function showToast(message, type = "info") {
  const toast = document.createElement("div");

  let color = "bg-gray-800";
  if (type === "success") color = "bg-green-600";
  if (type === "error") color = "bg-red-600";

  toast.className = `${color} text-white px-4 py-2 rounded shadow-lg animate-fade-in`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// progress bar
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress() {
  if (tasks.length === 0) {
    progressBar.style.width = "0%";
    progressText.textContent = "Žádné úkoly";
    return;
  }

  const doneTasks = tasks.filter(t => t.done).length;
  const percent = Math.round((doneTasks / tasks.length) * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}% splněno (${doneTasks}/${tasks.length})`;
}

//user display
const userDisplay = document.getElementById("userDisplay");

const user = localStorage.getItem("user");

if (user) {
  userDisplay.textContent = "👤 " + user;
}

// citáty
const quoteText = document.getElementById("quoteText");

async function loadQuote() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();

    quoteText.textContent = `"${data.content}" — ${data.author}`;
  } catch {
    quoteText.textContent = "Nepodařilo se načíst citát.";
  }
}

// THEME
function applyTheme() {
  if (theme === "neon") {
    body.classList.remove("bg-pink-100", "text-gray-800");
    body.classList.add("bg-gray-900", "text-white");
  } else {
    body.classList.remove("bg-gray-900", "text-white");
    body.classList.add("bg-pink-100", "text-gray-800");
  }
}

// toggle logika
themeToggle.addEventListener("click", () => {
  theme = theme === "neon" ? "cute" : "neon";
  localStorage.setItem("theme", theme);
  applyTheme();
});


// INIT
renderTasks();
renderCalendar();
applyTheme();
loadQuote();
setInterval(loadQuote, 30000);