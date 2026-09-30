import { deleteCustomer } from "../service/customer-service";

import { AUTH_ALERT } from "../constants/alerts";

import { showToast } from "../utils/toast";

export async function handleDeleteCustomer(id, onDeleted) {
    const confirmed = window.confirm(
        "Are you sure you want to delete this customer?",
    );

    if (!confirmed) {
        return;
    }

    try {
        const { status, data } = await deleteCustomer(id);

        if (status === 409) {
            showToast(data.message, "error");

            return;
        }

        if (status >= 400) {
            showToast(AUTH_ALERT.Error.ServerError, "error");

            return;
        }

        showToast("Customer deleted successfully.", "success");

        onDeleted();
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    }
}
