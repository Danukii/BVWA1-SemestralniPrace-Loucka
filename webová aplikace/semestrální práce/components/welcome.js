const welcomeText = document.getElementById("welcomeText");
const subText = document.getElementById("subText");
const todayDate =document.getElementById("todayDate");

function loadWelcome() {
    if (!welcomeText || !subText) return;

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {

        // RÁNO
        subText.textContent = "Začni den produktivně.";
        welcomeText.innerHTML = `Dobré ráno <span class="emoji">☀️</span>`;
        welcomeText.className = "transition-all duration-500 morning-gradient nunito-h1";
    }

    else if (hour >= 12 && hour < 18) {

        // ODPOLEDNE
        subText.textContent = "Pokračuj ve svých úkolech.";
        welcomeText.innerHTML = `Dobré odpoledne <span class="emoji">🌤️</span>`;
        welcomeText.className = "transition-all duration-500 afternoon-gradient nunito-h1";

    }
    else if (hour >= 18 && hour < 22) {

        // VEČER
        subText.textContent = "Čas dokončit poslední úkoly.";
        welcomeText.innerHTML = `Dobrý večer <span class="emoji">🌙</span>`;
        welcomeText.className = "transition-all duration-500 evening-gradient nunito-h1";
    }

    else {

        // NOC
        subText.textContent = "Nezapomeň si odpočinout.";
        welcomeText.innerHTML = `Pozdní noc <span class="emoji">🌌</span>`;
        welcomeText.className = "transition-all duration-500 night-gradient nunito-h1";
    }

    if (todayDate) {

        todayDate.textContent =
            new Date().toLocaleDateString("cs-CZ",
                {   weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );
    }
}

window.loadWelcome = loadWelcome;