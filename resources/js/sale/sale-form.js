import { createSale } from "../service/sale-service";
import { AUTH_ALERT } from "../constants/alerts";
import { showToast } from "../utils/toast";
import { initializeSaleCustomer } from "./sale-customer";
import { initializeSaleItems } from "./sale-items";

const saleForm = document.getElementById("saleForm");
const saleTotal = document.getElementById("saleTotal");
const clearSaleButton = document.getElementById("clearSaleButton");
const saveSaleButton = document.getElementById("saveSaleButton");

export function initializeSaleForm(salesTable) {
    const customer = initializeSaleCustomer();

    function calculateTotal() {
        const total = items
            .getItems()
            .reduce((sum, item) => sum + item.price * item.quantity, 0);

        saleTotal.textContent = `Rs. ${total.toFixed(2)}`;
    }

    const items = initializeSaleItems({
        onChange: calculateTotal,
    });

    function clearSale() {
        saleForm.reset();
        customer.clear();
        items.clear();
        calculateTotal();
    }

    clearSaleButton.addEventListener("click", clearSale);

    saleForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectedCustomer = customer.getSelectedCustomer();
        const saleItems = items.getItems();

        if (!selectedCustomer) {
            showToast("Please select a customer.", "error");
            return;
        }

        if (!saleItems.length) {
            showToast("Please add at least one product.", "error");
            return;
        }

        saveSaleButton.disabled = true;
        saveSaleButton.textContent = "Creating...";

        try {
            const { status, data } = await createSale({
                customer_id: selectedCustomer.id,
                items: saleItems.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                })),
            });

            if (status === 422) {
                showToast(
                    data.message || "Please check the sale details.",
                    "error",
                );
                return;
            }

            if (status >= 400) {
                showToast(AUTH_ALERT.Error.ServerError, "error");
                return;
            }

            showToast("Sale created successfully.", "success");
            clearSale();
            salesTable.ajax.reload(null, false);
        } catch (error) {
            showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
        } finally {
            saveSaleButton.disabled = false;
            saveSaleButton.textContent = "Create Sale";
        }
    });

    return { clear: clearSale };
}
