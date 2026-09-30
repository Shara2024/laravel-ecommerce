import { AUTH_ALERT } from "../constants/alerts";
import { signIn } from "../service/auth-service";
import { showToast } from "../utils/toast";

const signInButton = document.getElementById("signInButton");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

signInButton.addEventListener("click", async () => {
    const data = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    signInButton.disabled = true;
    signInButton.textContent = "Signing In...";

    try {
        const { status, data: result } = await signIn(data);

        if (status === 422) {
            const errors = Object.values(result.errors).flat().join(" ");

            showToast(errors, "error");
            return;
        }

        if (status === 401) {
            showToast(AUTH_ALERT.Error.InvalidCredentials, "error");
            return;
        }

        if (status >= 400) {
            showToast(AUTH_ALERT.Error.ServerError, "error");
            return;
        }

        showToast(AUTH_ALERT.Success.SignedIn, "success");

        window.location.href = result.redirect;
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    } finally {
        signInButton.disabled = false;
        signInButton.textContent = "Sign In";
    }
});
