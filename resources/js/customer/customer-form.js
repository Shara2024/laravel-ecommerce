import { createCustomer, updateCustomer } from "../service/customer-service";

import { AUTH_ALERT } from "../constants/alerts";

import { showToast } from "../utils/toast";

const addCustomerButton = document.getElementById("addCustomerButton");

const customerModal = document.getElementById("customerModal");

const customerModalTitle = document.getElementById("customerModalTitle");

const customerModalDescription = document.getElementById(
    "customerModalDescription",
);

const closeCustomerModal = document.getElementById("closeCustomerModal");

const cancelCustomerButton = document.getElementById("cancelCustomerButton");

const customerForm = document.getElementById("customerForm");

const saveCustomerButton = document.getElementById("saveCustomerButton");

const nameInput = document.getElementById("name");

const phoneInput = document.getElementById("phone");

const fields = ["name", "phone"];

let editingCustomerId = null;

/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
*/

function openModal() {
    customerModal.classList.add("show");

    customerModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    customerModal.classList.remove("show");

    customerModal.setAttribute("aria-hidden", "true");

    editingCustomerId = null;
}

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

function clearErrors() {
    fields.forEach((field) => {
        const input = document.getElementById(field);

        const error = document.getElementById(`${field}_error`);

        input.classList.remove("input-error");

        error.textContent = "";
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
    });
}

function resetForm() {
    customerForm.reset();

    clearErrors();

    editingCustomerId = null;
}

function setCreateMode() {
    customerModalTitle.textContent = "Add Customer";

    customerModalDescription.textContent = "Create a new customer.";

    saveCustomerButton.textContent = "Add Customer";
}

function setEditMode(customer) {
    editingCustomerId = customer.id;

    nameInput.value = customer.name;

    phoneInput.value = customer.phone;

    customerModalTitle.textContent = "Edit Customer";

    customerModalDescription.textContent = "Update customer details.";

    saveCustomerButton.textContent = "Update Customer";
}

function openCreateModal() {
    resetForm();

    setCreateMode();

    openModal();
}

function openEditModal(customer) {
    clearErrors();

    setEditMode(customer);

    openModal();
}

function getCustomerData() {
    return {
        name: nameInput.value,
        phone: phoneInput.value,
    };
}

/*
|--------------------------------------------------------------------------
| Save
|--------------------------------------------------------------------------
*/

async function saveCustomer() {
    const customer = getCustomerData();

    const isEditing = Boolean(editingCustomerId);

    const response = isEditing
        ? await updateCustomer(editingCustomerId, customer)
        : await createCustomer(customer);

    const { status, data } = response;

    if (status === 422) {
        showErrors(data.errors);

        return false;
    }

    if (status >= 400) {
        showToast(AUTH_ALERT.Error.ServerError, "error");

        return false;
    }

    showToast(
        isEditing
            ? "Customer updated successfully."
            : "Customer added successfully.",
        "success",
    );

    return true;
}

/*
|--------------------------------------------------------------------------
| Initialization
|--------------------------------------------------------------------------
*/

export function initializeCustomerForm({ onSaved }) {
    addCustomerButton.addEventListener("click", openCreateModal);

    closeCustomerModal.addEventListener("click", closeModal);

    cancelCustomerButton.addEventListener("click", closeModal);

    customerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        clearErrors();

        const isEditing = Boolean(editingCustomerId);

        saveCustomerButton.disabled = true;

        saveCustomerButton.textContent = isEditing
            ? "Updating..."
            : "Adding...";

        try {
            const saved = await saveCustomer();

            if (!saved) {
                return;
            }

            closeModal();

            resetForm();

            onSaved();
        } catch (error) {
            showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
        } finally {
            saveCustomerButton.disabled = false;

            saveCustomerButton.textContent = isEditing
                ? "Update Customer"
                : "Add Customer";
        }
    });

    return openEditModal;
}
