window.tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

window.notes =
    JSON.parse(localStorage.getItem("notes")) || [];

window.selectedDate = null;

window.theme =
    localStorage.getItem("theme") || "pastel";