import { AUTH_ALERT } from "../constants/alerts";
import { showToast } from "../utils/toast";
import { signUp } from "../service/auth-service";

const signUpButton = document.getElementById("signUpButton");

const fields = [
    "first_name",
    "last_name",
    "email",
    "password",
    "password_confirmation",
];

function clearErrors() {
    fields.forEach((field) => {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}_error`);

        input.classList.remove("input-error");
        error.textContent = "";
        error.classList.remove("show");
    });
}

function showErrors(errors) {
    Object.entries(errors).forEach(([field, messages]) => {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}_error`);

        if (!input || !error) {
            return;
        }

        input.classList.add("input-error");
        error.textContent = messages[0];
        error.classList.add("show");
    });
}

signUpButton.addEventListener("click", async () => {
    clearErrors();

    const data = Object.fromEntries(
        fields.map((field) => [field, document.getElementById(field).value]),
    );

    signUpButton.disabled = true;
    signUpButton.textContent = "Creating Account...";

    try {
        const { status, data: result } = await signUp(data);

        if (status === 422) {
            showErrors(result.errors);
            showToast(AUTH_ALERT.Warning.CompleteForm, "warning");
            return;
        }

        if (status >= 400) {
            showToast(AUTH_ALERT.Error.ServerError, "error");
            return;
        }

        showToast(AUTH_ALERT.Success.SignedUp, "success");

        window.location.assign(result.redirect);

        fields.forEach((field) => {
            document.getElementById(field).value = "";
        });
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    } finally {
        signUpButton.disabled = false;
        signUpButton.textContent = "Create Account";
    }
});
