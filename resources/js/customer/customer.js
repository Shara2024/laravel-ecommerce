// import DataTable from "datatables.net-bs5";
// import { createIcons, Pencil, Trash2 } from "lucide";

// import { AUTH_ALERT } from "../constants/alerts";

// import {
//     createCustomer,
//     updateCustomer,
//     deleteCustomer,
// } from "../service/customer-service";

// import { showToast } from "../utils/toast";

// const addCustomerButton = document.getElementById("addCustomerButton");

// const customerModal = document.getElementById("customerModal");

// const customerModalTitle = document.getElementById("customerModalTitle");

// const customerModalDescription = document.getElementById(
//     "customerModalDescription",
// );

// const closeCustomerModal = document.getElementById("closeCustomerModal");

// const cancelCustomerButton = document.getElementById("cancelCustomerButton");

// const customerForm = document.getElementById("customerForm");

// const saveCustomerButton = document.getElementById("saveCustomerButton");

// let editingCustomerId = null;

// function createCustomerIcons() {
//     createIcons({
//         icons: {
//             Pencil,
//             Trash2,
//         },
//     });
// }

// const customersTable = new DataTable("#customersTable", {
//     processing: true,

//     serverSide: true,

//     ajax: {
//         url: "/api/customers",
//         type: "GET",
//     },

//     columns: [
//         {
//             data: "name",
//             name: "name",
//         },

//         {
//             data: "phone",
//             name: "phone",
//         },

//         {
//             data: "created_at",
//             name: "created_at",

//             render: (data) => new Date(data).toLocaleDateString(),
//         },

//         {
//             data: null,

//             orderable: false,
//             searchable: false,

//             className: "text-end",

//             render: (data, type, row) => `
//                 <div class="product-actions">

//                     <button
//                         type="button"
//                         class="table-action-button edit-customer"
//                         aria-label="Edit customer"
//                         title="Edit"
//                     >
//                         <i data-lucide="pencil"></i>
//                     </button>

//                     <button
//                         type="button"
//                         class="table-action-button delete-customer"
//                         data-id="${row.id}"
//                         aria-label="Delete customer"
//                         title="Delete"
//                     >
//                         <i data-lucide="trash-2"></i>
//                     </button>

//                 </div>
//             `,
//         },
//     ],

//     pageLength: 10,

//     lengthMenu: [
//         [10, 25, 50],
//         [10, 25, 50],
//     ],

//     order: [[2, "desc"]],

//     language: {
//         processing: "Loading customers...",
//         emptyTable: "No customers found.",
//         zeroRecords: "No matching customers found.",
//     },

//     drawCallback: () => {
//         createCustomerIcons();
//     },
// });

// function openModal() {
//     customerModal.classList.add("show");

//     customerModal.setAttribute("aria-hidden", "false");
// }

// function closeModal() {
//     customerModal.classList.remove("show");

//     customerModal.setAttribute("aria-hidden", "true");

//     editingCustomerId = null;
// }

// function clearErrors() {
//     ["name", "phone"].forEach((field) => {
//         const input = document.getElementById(field);

//         const error = document.getElementById(`${field}_error`);

//         input.classList.remove("input-error");

//         error.textContent = "";
//     });
// }

// function showErrors(errors) {
//     Object.entries(errors).forEach(([field, messages]) => {
//         const input = document.getElementById(field);

//         const error = document.getElementById(`${field}_error`);

//         if (!input || !error) {
//             return;
//         }

//         input.classList.add("input-error");

//         error.textContent = messages[0];
//     });
// }

// function resetForm() {
//     customerForm.reset();

//     clearErrors();

//     editingCustomerId = null;
// }

// function openCreateModal() {
//     resetForm();

//     customerModalTitle.textContent = "Add Customer";

//     customerModalDescription.textContent = "Create a new customer.";

//     saveCustomerButton.textContent = "Add Customer";

//     openModal();
// }

// function openEditModal(customer) {
//     clearErrors();

//     editingCustomerId = customer.id;

//     document.getElementById("name").value = customer.name;

//     document.getElementById("phone").value = customer.phone;

//     customerModalTitle.textContent = "Edit Customer";

//     customerModalDescription.textContent = "Update customer details.";

//     saveCustomerButton.textContent = "Update Customer";

//     openModal();
// }

// function getCustomerData() {
//     return {
//         name: document.getElementById("name").value,
//         phone: document.getElementById("phone").value,
//     };
// }

// async function handleCreate(customer) {
//     const { status, data } = await createCustomer(customer);

//     if (status === 422) {
//         showErrors(data.errors);
//         return;
//     }

//     if (status >= 400) {
//         showToast(AUTH_ALERT.Error.ServerError, "error");
//         return;
//     }

//     showToast("Customer added successfully.", "success");

//     closeModal();
//     resetForm();

//     customersTable.ajax.reload(null, false);
// }

// async function handleUpdate(customer) {
//     const { status, data } = await updateCustomer(editingCustomerId, customer);

//     if (status === 422) {
//         showErrors(data.errors);
//         return;
//     }

//     if (status >= 400) {
//         showToast(AUTH_ALERT.Error.ServerError, "error");
//         return;
//     }

//     showToast("Customer updated successfully.", "success");

//     closeModal();
//     resetForm();

//     customersTable.ajax.reload(null, false);
// }

// async function handleDelete(id) {
//     const confirmed = window.confirm(
//         "Are you sure you want to delete this customer?",
//     );

//     if (!confirmed) {
//         return;
//     }

//     try {
//         const { status, data } = await deleteCustomer(id);

//         if (status === 409) {
//             showToast(data.message, "error");
//             return;
//         }

//         if (status >= 400) {
//             showToast(AUTH_ALERT.Error.ServerError, "error");
//             return;
//         }

//         showToast("Customer deleted successfully.", "success");

//         customersTable.ajax.reload(null, false);
//     } catch (error) {
//         showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
//     }
// }

// addCustomerButton.addEventListener("click", openCreateModal);

// closeCustomerModal.addEventListener("click", closeModal);

// cancelCustomerButton.addEventListener("click", closeModal);

// customerForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     clearErrors();

//     const customer = getCustomerData();

//     const isEditing = Boolean(editingCustomerId);

//     saveCustomerButton.disabled = true;

//     saveCustomerButton.textContent = isEditing ? "Updating..." : "Adding...";

//     try {
//         if (isEditing) {
//             await handleUpdate(customer);
//             return;
//         }

//         await handleCreate(customer);
//     } catch (error) {
//         showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
//     } finally {
//         saveCustomerButton.disabled = false;

//         saveCustomerButton.textContent = isEditing
//             ? "Update Customer"
//             : "Add Customer";
//     }
// });

// document
//     .getElementById("customersTable")
//     .addEventListener("click", async (event) => {
//         const editButton = event.target.closest(".edit-customer");

//         if (editButton) {
//             const row = customersTable.row(editButton.closest("tr")).data();

//             openEditModal(row);

//             return;
//         }

//         const deleteButton = event.target.closest(".delete-customer");

//         if (deleteButton) {
//             await handleDelete(deleteButton.dataset.id);
//         }
//     });

import { initializeCustomerForm } from "./customer-form";
import { initializeCustomerList } from "./customer-list";
import { handleDeleteCustomer } from "./customer-actions";

let customerTable;

const openEditCustomer = initializeCustomerForm({
    onSaved: () => {
        customerTable.ajax.reload(null, false);
    },
});

customerTable = initializeCustomerList({
    onEdit: openEditCustomer,

    onDelete: async (id) => {
        await handleDeleteCustomer(id, () => {
            customerTable.ajax.reload(null, false);
        });
    },
});