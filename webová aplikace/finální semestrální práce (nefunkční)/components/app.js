document.addEventListener("DOMContentLoaded", () => {

        applyTheme();
        renderTasks();
        renderCalendar();
        renderNotes();
        updateProgress();
        loadWelcome()
        if (typeof refreshQuote === "function") {
            refreshQuote();
        }
    }
);