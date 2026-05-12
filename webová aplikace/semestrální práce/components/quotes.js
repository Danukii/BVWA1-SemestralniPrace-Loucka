const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const refreshQuote = document.getElementById("refreshQuote");
const quotes = [
    {
        text: "Disciplína je silnější než motivace.",
        author: "StudyPlanner"
    },
    {
        text: "Malý progres je pořád progres.",
        author: "Neznámý autor"
    },
    {
        text: "Kdo se ptá, nezabloudí.",
        author: "České přísloví"
    },
    {
        text: "Malý progres je pořád progres.",
        author: "Neznámý autor"
    },
    {
        text: "Nikdy není pozdě začít znovu.",
        author: "Neznámý autor"
    },
    {
        text: "Disciplína je silnější než motivace.",
        author: "StudyPlanner"
    },
    {
        text: "Kdo se ptá, nezabloudí.",
        author: "České přísloví"
    },
    {
        text: "Bez práce nejsou koláče.",
        author: "České přísloví"
    },
    {
        text: "Nikdy není pozdě začít.",
        author: "Neznámý autor"
    },
    {
        text: "Malé kroky jsou také pokrok.",
        author: "Motivační citát"
    },
    {
        text: "Úspěch je součet malých snah opakovaných každý den.",
        author: "Robert Collier"
    }
];

function loadQuote() {
    if (!quoteText || !quoteAuthor) return;

    // fade out
    quoteText.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    setTimeout(() => {

    quoteText.textContent =
        `„${randomQuote.text}“`;

    quoteAuthor.textContent =
        `— ${randomQuote.author}`;

    // fade in
    quoteText.style.opacity = 1;
    quoteAuthor.style.opacity = 1;

    }, 200);
}

if (refreshQuote) {
    refreshQuote.addEventListener("click", () => {
        refreshQuote.classList.add("spin-animation");

        setTimeout(() => {
            refreshQuote.classList.remove("spin-animation");
        }, 800);

        loadQuote();
    });
}