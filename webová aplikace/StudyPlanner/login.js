const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    localStorage.setItem("loggedUser", email);

    alert("Přihlášení úspěšné");

    window.location.href = "index.html";
});