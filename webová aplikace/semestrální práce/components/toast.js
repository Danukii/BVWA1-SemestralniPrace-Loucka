const toastContainer = document.getElementById("toastContainer");

function showToast(message, type = "success") {
    if (!toastContainer) return;

    const colors = {
        success: "bg-green-100 border-green-300 text-green-700",
        error: "bg-red-100 border-red-300 text-red-700",
        info: "bg-cyan-100 border-cyan-300 text-cyan-700"
    };

    const icons = {
        success: "✨",
        error: "❌",
        info: "💡"
    };

    const toast = document.createElement("div");

    toast.className = `
        px-5 py-4 rounded-2xl border shadow-lg
        backdrop-blur-md animate-toast
        ${colors[type]}
    `;

    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <span>${icons[type]}</span>
            <p>${message}</p>
        </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform = "translateX(40px)";

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2600);
}