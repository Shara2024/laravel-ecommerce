import DataTable from "datatables.net-bs5";
import { createIcons, Pencil, Plus, Trash2, X } from "lucide";
import { AUTH_ALERT } from "../constants/alerts";
import {
    createProduct,
    updateProduct,
    deleteProduct,
} from "../service/product-service";
import { showToast } from "../utils/toast";

const addProductButton = document.getElementById("addProductButton");

const productModal = document.getElementById("productModal");

const productModalTitle = document.getElementById("productModalTitle");

const productModalDescription = document.getElementById(
    "productModalDescription",
);

const closeProductModal = document.getElementById("closeProductModal");

const cancelProductButton = document.getElementById("cancelProductButton");

const productForm = document.getElementById("productForm");

const saveProductButton = document.getElementById("saveProductButton");

let editingProductId = null;

function createProductIcons() {
    createIcons({
        icons: {
            Pencil,
            Plus,
            Trash2,
            X,
        },
    });
}

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

            render: (data) => {
                return Number(data).toFixed(2);
            },
        },

        {
            data: "stock",
            name: "stock",
        },

        {
            data: "created_at",
            name: "created_at",

            render: (data) => {
                return new Date(data).toLocaleDateString();
            },
        },

        {
            data: null,
            orderable: false,
            searchable: false,
            className: "text-end",

            render: (data, type, row) => {
                return `
                    <div class="product-actions">

                        <button
                            type="button"
                            class="table-action-button edit-product"
                            data-id="${row.id}"
                            aria-label="Edit product"
                            title="Edit">

                            <i data-lucide="pencil"></i>

                        </button>

                        <button
                            type="button"
                            class="table-action-button delete-product"
                            data-id="${row.id}"
                            aria-label="Delete product"
                            title="Delete">

                            <i data-lucide="trash-2"></i>

                        </button>

                    </div>
                `;
            },
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

createProductIcons();

function openModal() {
    productModal.classList.add("show");
    productModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    productModal.classList.remove("show");
    productModal.setAttribute("aria-hidden", "true");

    editingProductId = null;
}

function clearErrors() {
    ["name", "price", "stock"].forEach((field) => {
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
    productForm.reset();
    clearErrors();
    editingProductId = null;
}

function openCreateModal() {
    resetForm();

    productModalTitle.textContent = "Add Product";
    productModalDescription.textContent = "Create a new product.";

    saveProductButton.textContent = "Add Product";

    openModal();
}

function openEditModal(product) {
    clearErrors();

    editingProductId = product.id;

    document.getElementById("name").value = product.name;

    document.getElementById("price").value = product.price;

    document.getElementById("stock").value = product.stock;

    productModalTitle.textContent = "Edit Product";

    productModalDescription.textContent = "Update product details.";

    saveProductButton.textContent = "Update Product";

    openModal();
}

function getProductData() {
    return {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
    };
}

async function handleCreate(product) {
    const { status, data } = await createProduct(product);

    if (status === 422) {
        showErrors(data.errors);
        return;
    }

    if (status >= 400) {
        showToast(AUTH_ALERT.Error.ServerError, "error");

        return;
    }

    showToast(AUTH_ALERT.Success.ProductCreated, "success");

    closeModal();
    resetForm();

    productsTable.ajax.reload(null, false);
}

async function handleUpdate(product) {
    const { status, data } = await updateProduct(editingProductId, product);

    if (status === 422) {
        showErrors(data.errors);
        return;
    }

    if (status >= 400) {
        showToast(AUTH_ALERT.Error.ServerError, "error");

        return;
    }

    showToast("Product updated successfully.", "success");

    closeModal();
    resetForm();

    productsTable.ajax.reload(null, false);
}

async function handleDelete(id) {
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

        productsTable.ajax.reload(null, false);
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    }
}

addProductButton.addEventListener("click", openCreateModal);

closeProductModal.addEventListener("click", closeModal);

cancelProductButton.addEventListener("click", closeModal);

productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearErrors();

    const product = getProductData();

    saveProductButton.disabled = true;

    saveProductButton.textContent = editingProductId
        ? "Updating..."
        : "Adding...";

    try {
        if (editingProductId) {
            await handleUpdate(product);
            return;
        }

        await handleCreate(product);
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    } finally {
        saveProductButton.disabled = false;

        saveProductButton.textContent = editingProductId
            ? "Update Product"
            : "Add Product";
    }
});

document
    .getElementById("productsTable")
    .addEventListener("click", async (event) => {
        const editButton = event.target.closest(".edit-product");

        if (editButton) {
            const row = productsTable.row(editButton.closest("tr")).data();

            openEditModal(row);

            return;
        }

        const deleteButton = event.target.closest(".delete-product");

        if (deleteButton) {
            await handleDelete(deleteButton.dataset.id);
        }
    });
