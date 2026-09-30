import { AUTH_ALERT } from "../constants/alerts";
import { showToast } from "../utils/toast";

const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", async () => {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    logoutButton.disabled = true;

    try {
        const response = await fetch("/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = result.redirect;
            return;
        }

        showToast(AUTH_ALERT.Error.ServerError, "error");
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    } finally {
        logoutButton.disabled = false;
    }
});
