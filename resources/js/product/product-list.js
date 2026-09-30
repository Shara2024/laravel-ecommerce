import DataTable from "datatables.net-bs5";

import { createIcons, Pencil, Trash2 } from "lucide";

function createProductIcons() {
    createIcons({
        icons: {
            Pencil,
            Trash2,
        },
    });
}

export function initializeProductList({ onEdit, onDelete }) {
    const productsTable = new DataTable("#productsTable", {
        processing: true,

        serverSide: true,

        ajax: {
            url: "/api/products",
            type: "GET",
        },

        columns: [
            {
                data: "name",
                name: "name",
            },

            {
                data: "price",
                name: "price",

                render: (data) => Number(data).toFixed(2),
            },

            {
                data: "stock",
                name: "stock",
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
                                    class="table-action-button edit-product"
                                    aria-label="Edit product"
                                    title="Edit"
                                >
                                    <i data-lucide="pencil"></i>
                                </button>

                                <button
                                    type="button"
                                    class="table-action-button delete-product"
                                    data-id="${row.id}"
                                    aria-label="Delete product"
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

        order: [[3, "desc"]],

        language: {
            processing: "Loading products...",

            emptyTable: "No products found.",

            zeroRecords: "No matching products found.",
        },

        drawCallback: () => {
            createProductIcons();
        },
    });

    document
        .getElementById("productsTable")
        .addEventListener("click", async (event) => {
            const editButton = event.target.closest(".edit-product");

            if (editButton) {
                const row = productsTable.row(editButton.closest("tr")).data();

                onEdit(row);

                return;
            }

            const deleteButton = event.target.closest(".delete-product");

            if (!deleteButton) {
                return;
            }

            await onDelete(deleteButton.dataset.id);
        });

    return productsTable;
}
