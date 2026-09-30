import DataTable from "datatables.net-bs5";

import { createIcons, Pencil, Trash2 } from "lucide";

function createCustomerIcons() {
    createIcons({
        icons: {
            Pencil,
            Trash2,
        },
    });
}

export function initializeCustomerList({ onEdit, onDelete }) {
    const customersTable = new DataTable("#customersTable", {
        processing: true,

        serverSide: true,

        ajax: {
            url: "/api/customers",
            type: "GET",
        },

        columns: [
            {
                data: "name",
                name: "name",
            },

            {
                data: "phone",
                name: "phone",
            },

            {
                data: "created_at",
                name: "created_at",

                render: (data) => new Date(data).toLocaleDateString(),
            },

            {
                data: null,

                orderable: false,
                searchable: false,

                className: "text-end",

                render: (data, type, row) => `
                            <div class="product-actions">

                                <button
                                    type="button"
                                    class="table-action-button edit-customer"
                                    aria-label="Edit customer"
                                    title="Edit"
                                >
                                    <i data-lucide="pencil"></i>
                                </button>

                                <button
                                    type="button"
                                    class="table-action-button delete-customer"
                                    data-id="${row.id}"
                                    aria-label="Delete customer"
                                    title="Delete"
                                >
                                    <i data-lucide="trash-2"></i>
                                </button>

                            </div>
                        `,
            },
        ],

        pageLength: 10,

        lengthMenu: [
            [10, 25, 50],
            [10, 25, 50],
        ],

        order: [[2, "desc"]],

        language: {
            processing: "Loading customers...",

            emptyTable: "No customers found.",

            zeroRecords: "No matching customers found.",
        },

        drawCallback: () => {
            createCustomerIcons();
        },
    });

    document
        .getElementById("customersTable")
        .addEventListener("click", async (event) => {
            const editButton = event.target.closest(".edit-customer");

            if (editButton) {
                const row = customersTable.row(editButton.closest("tr")).data();

                onEdit(row);

                return;
            }

            const deleteButton = event.target.closest(".delete-customer");

            if (!deleteButton) {
                return;
            }

            await onDelete(deleteButton.dataset.id);
        });

    return customersTable;
}
