import Modal from "bootstrap/js/dist/modal";
import { createIcons, X } from "lucide";
import { searchCustomers } from "../service/sale-service";
import { createCustomer } from "../service/customer-service";
import { AUTH_ALERT } from "../constants/alerts";
import { showToast } from "../utils/toast";
import { debounce } from "../utils/debounce";

const customerSearch = document.getElementById("customerSearch");

const customerSearchResults = document.getElementById("customerSearchResults");

const selectedCustomer = document.getElementById("selectedCustomer");

const addCustomerFromSale = document.getElementById("addCustomerFromSale");

const quickCustomerModalElement = document.getElementById("quickCustomerModal");

const closeQuickCustomerModal = document.getElementById(
    "closeQuickCustomerModal",
);

const cancelQuickCustomerButton = document.getElementById(
    "cancelQuickCustomerButton",
);

const quickCustomerForm = document.getElementById("quickCustomerForm");

const saveQuickCustomerButton = document.getElementById(
    "saveQuickCustomerButton",
);

const quickCustomerModal = Modal.getOrCreateInstance(quickCustomerModalElement);

let selectedCustomerData = null;

function createCustomerIcons() {
    createIcons({
        icons: {
            X,
        },
    });
}

function clearSearchResults() {
    customerSearchResults.classList.add("d-none");

    customerSearchResults.innerHTML = "";
}

function renderCustomerResults(customers) {
    if (!customers.length) {
        customerSearchResults.innerHTML = `
            <div class="search-result-empty">
                No customers found.
            </div>
        `;

        customerSearchResults.classList.remove("d-none");

        return;
    }

    customerSearchResults.innerHTML = customers
        .map(
            (customer) => `
                    <button
                        type="button"
                        class="search-result-item customer-result"
                        data-id="${customer.id}"
                    >
                        <span>
                            <strong>
                                ${customer.name}
                            </strong>

                            <small>
                                ${customer.phone}
                            </small>
                        </span>
                    </button>
                `,
        )
        .join("");

    customerSearchResults.classList.remove("d-none");

    customerSearchResults
        .querySelectorAll(".customer-result")
        .forEach((button) => {
            button.addEventListener("click", () => {
                const customer = customers.find(
                    (item) => String(item.id) === button.dataset.id,
                );

                selectCustomer(customer);
            });
        });
}

const handleCustomerSearch = debounce(async () => {
    const search = customerSearch.value.trim();

    if (!search) {
        clearSearchResults();

        return;
    }

    try {
        const { status, data } = await searchCustomers(search);

        if (status >= 400) {
            showToast(AUTH_ALERT.Error.ServerError, "error");

            return;
        }

        renderCustomerResults(data.customers);
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    }
});

function selectCustomer(customer) {
    selectedCustomerData = customer;

    customerSearch.value = "";

    clearSearchResults();

    selectedCustomer.innerHTML = `
        <div class="selected-customer-info">

            <div>
                <strong>
                    ${customer.name}
                </strong>

                <span>
                    ${customer.phone}
                </span>
            </div>

            <button
                type="button"
                id="removeSelectedCustomer"
                class="selected-remove"
                aria-label="Remove customer"
            >
                <i data-lucide="x"></i>
            </button>

        </div>
    `;

    selectedCustomer.classList.remove("d-none");

    createCustomerIcons();

    document
        .getElementById("removeSelectedCustomer")
        .addEventListener("click", clearSelectedCustomer);
}

function clearSelectedCustomer() {
    selectedCustomerData = null;

    selectedCustomer.innerHTML = "";

    selectedCustomer.classList.add("d-none");

    customerSearch.focus();
}

function clearQuickCustomerErrors() {
    document.getElementById("quickCustomerNameError").textContent = "";

    document.getElementById("quickCustomerPhoneError").textContent = "";
}

function showQuickCustomerErrors(errors) {
    if (errors.name) {
        document.getElementById("quickCustomerNameError").textContent =
            errors.name[0];
    }

    if (errors.phone) {
        document.getElementById("quickCustomerPhoneError").textContent =
            errors.phone[0];
    }
}

function openQuickCustomer() {
    quickCustomerForm.reset();

    clearQuickCustomerErrors();

    quickCustomerModal.show();

    document.getElementById("quickCustomerName").focus();
}

async function submitQuickCustomer(customer) {
    const { status, data } = await createCustomer(customer);

    if (status === 422) {
        showQuickCustomerErrors(data.errors);

        return null;
    }

    if (status >= 400) {
        showToast(AUTH_ALERT.Error.ServerError, "error");

        return null;
    }

    return data.customer;
}

export function initializeSaleCustomer() {
    customerSearch.addEventListener("input", handleCustomerSearch);

    addCustomerFromSale.addEventListener("click", openQuickCustomer);

    closeQuickCustomerModal.addEventListener("click", () =>
        quickCustomerModal.hide(),
    );

    cancelQuickCustomerButton.addEventListener("click", () =>
        quickCustomerModal.hide(),
    );

    quickCustomerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        clearQuickCustomerErrors();

        const customer = {
            name: document.getElementById("quickCustomerName").value,

            phone: document.getElementById("quickCustomerPhone").value,
        };

        saveQuickCustomerButton.disabled = true;

        saveQuickCustomerButton.textContent = "Adding...";

        try {
            const createdCustomer = await submitQuickCustomer(customer);

            if (!createdCustomer) {
                return;
            }

            quickCustomerModal.hide();

            selectCustomer(createdCustomer);

            showToast("Customer added successfully.", "success");
        } catch (error) {
            showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
        } finally {
            saveQuickCustomerButton.disabled = false;

            saveQuickCustomerButton.textContent = "Add Customer";
        }
    });

    return {
        getSelectedCustomer: () => selectedCustomerData,

        clear: clearSelectedCustomer,
    };
}
