import DataTable from "datatables.net-bs5";
import { createIcons, Eye } from "lucide";

function createSaleIcons() {
    createIcons({
        icons: {
            Eye,
        },
    });
}

export function initializeSaleList({ onView }) {
    const salesTable = new DataTable("#salesTable", {
        processing: true,

        serverSide: true,

        ajax: {
            url: "/api/sales",
            type: "GET",
        },

        columns: [
            {
                data: "customer.name",
                name: "customer.name",
            },

            {
                data: "total_amount",
                name: "total_amount",

                render: (data) => `Rs. ${Number(data).toFixed(2)}`,
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
                            <button
                                type="button"
                                class="table-action-button view-sale"
                                data-id="${row.id}"
                                aria-label="View sale"
                                title="View"
                            >
                                <i data-lucide="eye"></i>
                            </button>
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
            processing: "Loading sales...",

            emptyTable: "No sales found.",

            zeroRecords: "No matching sales found.",
        },

        drawCallback: () => {
            createSaleIcons();
        },
    });

    document
        .getElementById("salesTable")
        .addEventListener("click", async (event) => {
            const viewButton = event.target.closest(".view-sale");

            if (!viewButton) {
                return;
            }

            await onView(viewButton.dataset.id);
        });

    return salesTable;
}
