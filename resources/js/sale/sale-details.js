import Modal from "bootstrap/js/dist/modal";
import { getSale } from "../service/sale-service";
import { AUTH_ALERT } from "../constants/alerts";
import { showToast } from "../utils/toast";

const modalElement = document.getElementById("viewSaleModal");

const modal = Modal.getOrCreateInstance(modalElement);

const content = document.getElementById("saleDetailsContent");

const loading = document.getElementById("saleDetailsLoading");

const title = document.getElementById("viewSaleTitle");

const description = document.getElementById("viewSaleDescription");

const customer = document.getElementById("viewSaleCustomer");

const email = document.getElementById("viewSaleEmail");

const phone = document.getElementById("viewSalePhone");

const date = document.getElementById("viewSaleDate");

const items = document.getElementById("viewSaleItems");

const total = document.getElementById("viewSaleTotal");

function resetDetails() {
    title.textContent = "Sale Details";

    description.textContent = "View sale information.";

    customer.textContent = "-";

    phone.textContent = "-";

    date.textContent = "-";

    items.innerHTML = "";

    total.textContent = "Rs. 0.00";
}

function showLoading() {
    content.classList.add("d-none");

    loading.classList.remove("d-none");
}

function hideLoading() {
    loading.classList.add("d-none");

    content.classList.remove("d-none");
}

function renderSale(sale) {
    title.textContent = `Sale #${sale.id}`;

    customer.textContent = sale.customer.name;

    phone.textContent = sale.customer.phone;

    date.textContent = new Date(sale.created_at).toLocaleDateString();

    items.innerHTML = sale.items
        .map(
            (item) => `
                    <tr>

                        <td>
                            ${item.product.name}
                        </td>

                        <td>
                            ${item.quantity}
                        </td>

                        <td>
                            Rs. ${Number(item.unit_price).toFixed(2)}
                        </td>

                        <td class="text-end">
                            Rs. ${Number(item.subtotal).toFixed(2)}
                        </td>

                    </tr>
                `,
        )
        .join("");

    total.textContent = `Rs. ${Number(sale.total_amount).toFixed(2)}`;
}

export async function showSaleDetails(id) {
    resetDetails();

    modal.show();

    showLoading();

    try {
        const { status, data } = await getSale(id);

        if (status === 404) {
            showToast("Sale not found.", "error");

            modal.hide();

            return;
        }

        if (status >= 400) {
            showToast(AUTH_ALERT.Error.ServerError, "error");

            modal.hide();

            return;
        }

        renderSale(data.sale);
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");

        modal.hide();
    } finally {
        hideLoading();
    }
}
