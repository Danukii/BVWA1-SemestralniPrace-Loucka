try {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
} catch {
    notes = [];
}

// elementy
const newNoteBtn = document.getElementById("newNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// barvy poznamek
const noteColors = [
    "#ffe4f1",
    "#e0f2fe",
    "#ede9fe",
    "#dcfce7",
    "#fef9c3"
];

// helpers
function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

// save
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// create note
if (newNoteBtn) {
    newNoteBtn.addEventListener("click", () => {

        const randomColor =
            noteColors[Math.floor(Math.random() * noteColors.length)];

        const newNote = {
            id: Date.now(),
            title: "Nová poznámka",
            text: "Klikni pro úpravu...",
            color: randomColor,
            date: getTodayStr()
        };

        notes.push(newNote);

        saveNotes();
        renderNotes();

        if (typeof showToast === "function") {
            showToast("Poznámka přidána");
        }
    });
}

// render notes
function renderNotes() {

    if (!notesContainer) return;

    const dateStr = getTodayStr();

    notesContainer.innerHTML = "";

    notes.forEach(note => {

        const div = document.createElement("div");

        div.className = "note-card";
        div.style.background = note.color;

        div.innerHTML = `
            <div class="flex justify-between items-start">

                <input class="note-title bg-transparent outline-none font-bold"
                    value="${note.title || ""}"
                />

                <button class="delete-note text-red-400">✕</button>
            </div>

            <textarea class="note-text bg-transparent w-full mt-2 outline-none resize-none">
                ${note.text || ""}
            </textarea>

            <div class="text-xs opacity-60 mt-2">
                ${note.date || ""}
            </div>
        `;

        // title edit
        const titleInput = div.querySelector(".note-title");

        titleInput.addEventListener("input", () => {
            note.title = titleInput.value;
            saveNotes();
        });

        // text edit
        const textArea = div.querySelector(".note-text");

        textArea.addEventListener("input", () => {
            note.text = textArea.value;
            saveNotes();
        });

        // delete
        const delBtn = div.querySelector(".delete-note");

        delBtn.addEventListener("click", () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            renderNotes();

            if (typeof showToast === "function") {
                showToast("Poznámka odstraněna", "error");
            }
        });

        notesContainer.appendChild(div);
    });
}

// init
document.addEventListener("DOMContentLoaded", () => {
    renderNotes();
});