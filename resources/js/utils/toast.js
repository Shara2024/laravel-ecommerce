let toastContainer = null;

function createToastContainer() {
    if (toastContainer) {
        return toastContainer;
    }

    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";

    document.body.appendChild(toastContainer);

    return toastContainer;
}

export function showToast(message, type = "info", duration = 3000) {
    const container = createToastContainer();

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button type="button" class="toast-close" aria-label="Close">
            &times;
        </button>
    `;

    container.appendChild(toast);

    const closeButton = toast.querySelector(".toast-close");

    const removeToast = () => {
        toast.classList.add("toast-removing");

        toast.addEventListener(
            "animationend",
            () => {
                toast.remove();
            },
            { once: true },
        );
    };

    closeButton.addEventListener("click", removeToast);

    setTimeout(removeToast, duration);
}
