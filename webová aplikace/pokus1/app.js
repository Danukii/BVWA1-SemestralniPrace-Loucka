const body = document.getElementById("body");
const themeToggle = document.getElementById("themeToggle");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const taskStats = document.getElementById("taskStats");
const calendar = document.getElementById("calendar");
const monthLabel = document.getElementById("monthLabel");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const notes = document.getElementById("notes");
const toastContainer = document.getElementById("toastContainer");
const quoteText = document.getElementById("quoteText");
const refreshQuote = document.getElementById("refreshQuote");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = localStorage.getItem("theme") || "pastel";
let currentDate = new Date();
let selectedDate = null;
const quotes = [
"Každý den je nová šance.",
"Disciplína vytváří výsledky.",
"Malý progres je stále progres.",
"Dokážeš víc, než si myslíš.",
"Nepřestávej, když je to těžké."
];
notes.value = localStorage.getItem("notes") || "";
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showToast(message, type = "success") {
const toast = document.createElement("div");
toast.className = `toast ${type}`;
toast.textContent = message;
toastContainer.appendChild(toast);
setTimeout(() => {
toast.remove();
}, 3000);
}

function updateProgress() {
if (tasks.length === 0) {
progressBar.style.width = "0%";
progressText.textContent = "0% splněno";
return;
}
const done = tasks.filter(task => task.done).length;
const percent = Math.round((done / tasks.length) * 100);
progressBar.style.width = percent + "%";
progressText.textContent = `${percent}% splněno`;
taskStats.textContent = `${done}/${tasks.length} dokončeno`;
}
function renderTasks() {
taskList.innerHTML = "";
let filtered = tasks;
if (selectedDate) {
filtered = tasks.filter(task => task.date === selectedDate);
}
filtered.forEach(task => {
const li = document.createElement("li");
let priority = "low-priority";
if (task.priority === "medium") priority = "medium-priority";
if (task.priority === "high") priority = "high-priority";
li.className = `task-card ${priority}`;
const left = document.createElement("div");
left.className = "flex items-center gap-3";
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.done;
checkbox.addEventListener("change", () => {
task.done = checkbox.checked;
saveTasks();
renderTasks();
});
const text = document.createElement("span");
text.textContent = task.text;
if (task.done) {
10
text.classList.add("line-through", "opacity-50");
}
left.appendChild(checkbox);
left.appendChild(text);
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "✕";
deleteBtn.addEventListener("click", () => {
tasks = tasks.filter(t => t !== task);
saveTasks();
renderTasks();
renderCalendar();
showToast("Úkol odstraněn", "error");
});
li.appendChild(left);
li.appendChild(deleteBtn);
taskList.appendChild(li);
});
updateProgress();
}
function renderCalendar() {
calendar.innerHTML = "";
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
monthLabel.textContent = currentDate.toLocaleDateString("cs-CZ", {
month: "long",
year: "numeric"
});
const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();
for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
calendar.innerHTML += "<div></div>";
}
for (let day = 1; day <= daysInMonth; day++) {
const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-$
{String(day).padStart(2, "0")}`;
const div = document.createElement("div");
div.className = "calendar-day";
div.textContent = day;

if (selectedDate === dateStr) {
div.classList.add("selected-day");
}
div.addEventListener("click", () => {
selectedDate = dateStr;
taskDate.value = dateStr;
renderCalendar();
renderTasks();
});
calendar.appendChild(div);
}
}
function applyTheme() {
if (theme === "neon") {
body.classList.remove("theme-pastel");
body.classList.add("theme-neon");
}
else {
body.classList.remove("theme-neon");
body.classList.add("theme-pastel");
}
}
function loadQuote() {
quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}
themeToggle.addEventListener("click", () => {
theme = theme === "pastel" ? "neon" : "pastel";
localStorage.setItem("theme", theme);
applyTheme();
});
refreshQuote.addEventListener("click", loadQuote);
notes.addEventListener("input", () => {
localStorage.setItem("notes", notes.value);
});
prevMonth.addEventListener("click", () => {
currentDate.setMonth(currentDate.getMonth() - 1);
renderCalendar();
});
nextMonth.addEventListener("click", () => {

currentDate.setMonth(currentDate.getMonth() + 1);
renderCalendar();
});
taskForm.addEventListener("submit", (e) => {
e.preventDefault();
if (taskInput.value.trim() === "") return;
tasks.push({
text: taskInput.value,
priority: taskPriority.value,
date: taskDate.value || null,
done: false
});
saveTasks();
taskInput.value = "";
renderTasks();
renderCalendar();
showToast("Úkol přidán");
});
renderTasks();
renderCalendar();
loadQuote();
applyTheme();