const calendar =
    document.getElementById("calendar");

const monthLabel =
    document.getElementById("monthLabel");

const prevMonth =
    document.getElementById("prevMonth");

const nextMonth =
    document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar() {

    if (!calendar) return;

    calendar.innerHTML = "";

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const firstDay =
        new Date(year, month, 1);

    const lastDay =
        new Date(year, month + 1, 0);

    monthLabel.textContent =
        firstDay.toLocaleDateString(
            "cs-CZ",
            {
                month: "long",
                year: "numeric"
            }
        );

    let start =
        firstDay.getDay();

    start = start === 0 ? 6 : start - 1;

    for (let i = 0; i < start; i++) {

        const empty =
            document.createElement("div");

        calendar.appendChild(empty);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {

        const date =
            `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        const dayEl =
            document.createElement("div");

        dayEl.className = "calendar-day";

        const today = new Date();

        const todayStr =
            `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

        // dnešní den
        if (date === todayStr) {
            dayEl.classList.add("selected-day");
        }

        // kliknutý den
        if (window.selectedDate === date) {
            dayEl.style.outline = "3px solid #ec4899";
}

        dayEl.textContent = day;

        const count =
            tasks.filter(
                t => t.date === date
            ).length;

        if (count > 0) {

            const dot =
                document.createElement("div");

            dot.className = "calendar-dot";

            dot.textContent = count;

            dayEl.appendChild(dot);
        }

        dayEl.addEventListener("click", () => {

            if (selectedDate === date) {
                selectedDate = null;
            } else {
                selectedDate = date;
            }

            renderCalendar();
            renderTasks();
        });

        calendar.appendChild(dayEl);
    }
}

if (prevMonth) {
    prevMonth.addEventListener("click", () => {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        renderCalendar();
    });
}

if (nextMonth) {
    nextMonth.addEventListener("click", () => {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );

        renderCalendar();
    });
}

window.renderCalendar = renderCalendar;