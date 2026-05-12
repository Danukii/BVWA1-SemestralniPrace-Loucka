const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");

if (!taskDate.value) {
    taskDate.value = new Date().toISOString().split("T")[0];
}

const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const taskProgressText = document.getElementById("taskProgressText");
const taskStats = document.getElementById("taskStats");

let selectedPriority = "low";

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateProgress() {

    const done =
        tasks.filter(t => t.done).length;

    const total = tasks.length;

    const percent =
        total === 0
            ? 0
            : Math.round((done / total) * 100);

    if (progressText) {
        progressText.textContent =
            percent + "%";
    }

    if (progressBar) {
        progressBar.style.width =
            percent + "%";
    }

    if (taskProgressText) {
        taskProgressText.textContent =
            `${percent}% splněno`;
    }

    if (taskStats) {
        taskStats.textContent =
            `${done}/${total} dokončeno`;
    }
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;

    const date =
        taskDate.value ||
        new Date().toISOString().split("T")[0];

    tasks.push({
        id: Date.now(),
        text: text,
        priority: selectedPriority,
        date: date,
        done: false
    });

    console.log("ADDED TASK:", tasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    renderTasks();
    updateProgress();
});

function renderTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";

    let filtered = tasks;

    if (window.selectedDate) {

        filtered =
            tasks.filter(
                t => t.date === window.selectedDate
            );
    }

    if (filtered.length === 0) {

        taskList.innerHTML =
            `<p class="opacity-60">
                Žádné úkoly
            </p>`;

        updateProgress();

        return;
    }

    filtered.forEach(task => {

        const li =
            document.createElement("li");

        li.className = "task-item";

        li.innerHTML = `
            <div class="task-left">

                <button class="task-check">
                    ${task.done ? "✔" : ""}
                </button>

                <span class="
                    task-text
                    ${task.done ? "line-through opacity-50" : ""}
                ">
                    ${task.text}
                </span>

                <div class="
                    task-priority
                    priority-${task.priority}
                "></div>

            </div>

            <button class="delete-btn">
                ✕
            </button>
        `;

        // CHECK
        const checkBtn =
            li.querySelector(".task-check");

        checkBtn.addEventListener("click", () => {

            task.done = !task.done;

            saveTasks();

            renderTasks();

            if (window.renderCalendar) {
                renderCalendar();
            }

            updateProgress();
        });

        // DELETE
        const deleteBtn =
            li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {

            tasks =
                tasks.filter(
                    t => t.id !== task.id
                );

            saveTasks();

            renderTasks();

            if (window.renderCalendar) {
                renderCalendar();
            }

            updateProgress();
        });

        taskList.appendChild(li);
    });

    updateProgress();
}