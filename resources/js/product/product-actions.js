import { deleteProduct } from "../service/product-service";

import { AUTH_ALERT } from "../constants/alerts";

import { showToast } from "../utils/toast";

export async function handleDeleteProduct(id, onDeleted) {
    const confirmed = window.confirm(
        "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
        return;
    }

    try {
        const { status } = await deleteProduct(id);

        if (status >= 400) {
            showToast(AUTH_ALERT.Error.ServerError, "error");

            return;
        }

        showToast("Product deleted successfully.", "success");

        onDeleted();
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    }
}
