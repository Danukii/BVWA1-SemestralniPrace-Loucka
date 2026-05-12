const body = document.getElementById("body");

const themeToggle =
    document.getElementById("themeToggle");

const themeToggleIcon =
    document.querySelector("#themeToggle img");

const favicon =
    document.getElementById("favicon");

const logo =
    document.querySelector(".logo");

function applyTheme() {

    if (window.theme === "neon") {

        body.classList.remove("theme-pastel");
        body.classList.add("theme-neon");

        if (themeToggleIcon) {
            themeToggleIcon.src = "images/pastel.svg";
        }

        if (favicon) {
            favicon.href = "images/icon-neon.png";
        }

        if (logo) {
            logo.textContent = "⚡";
        }

    } else {

        body.classList.remove("theme-neon");
        body.classList.add("theme-pastel");

        if (themeToggleIcon) {
            themeToggleIcon.src = "images/neon.svg";
        }

        if (favicon) {
            favicon.href = "images/icon-pastel.png";
        }

        if (logo) {
            logo.textContent = "🌸";
        }
    }
}

function toggleTheme() {

    window.theme =
        window.theme === "pastel"
            ? "neon"
            : "pastel";

    localStorage.setItem(
        "theme",
        window.theme
    );

    applyTheme();
}

if (themeToggle) {
    themeToggle.addEventListener(
        "click",
        toggleTheme
    );
}

window.applyTheme = applyTheme;