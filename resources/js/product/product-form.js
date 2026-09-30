import { createIcons, Plus, X } from "lucide";

import { createProduct, updateProduct } from "../service/product-service";

import { AUTH_ALERT } from "../constants/alerts";
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

const nameInput = document.getElementById("name");

const priceInput = document.getElementById("price");

const stockInput = document.getElementById("stock");

const fields = ["name", "price", "stock"];

let editingProductId = null;

function createProductFormIcons() {
    createIcons({
        icons: {
            Plus,
            X,
        },
    });
}

/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
*/

function openModal() {
    productModal.classList.add("show");

    productModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    productModal.classList.remove("show");

    productModal.setAttribute("aria-hidden", "true");

    editingProductId = null;
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
    productForm.reset();

    clearErrors();

    editingProductId = null;
}

function setCreateMode() {
    productModalTitle.textContent = "Add Product";

    productModalDescription.textContent = "Create a new product.";

    saveProductButton.textContent = "Add Product";
}

function setEditMode(product) {
    editingProductId = product.id;

    nameInput.value = product.name;

    priceInput.value = product.price;

    stockInput.value = product.stock;

    productModalTitle.textContent = "Edit Product";

    productModalDescription.textContent = "Update product details.";

    saveProductButton.textContent = "Update Product";
}

function openCreateModal() {
    resetForm();

    setCreateMode();

    openModal();
}

function openEditModal(product) {
    clearErrors();

    setEditMode(product);

    openModal();
}

function getProductData() {
    return {
        name: nameInput.value,
        price: priceInput.value,
        stock: stockInput.value,
    };
}

/*
|--------------------------------------------------------------------------
| Save
|--------------------------------------------------------------------------
*/

async function saveProduct() {
    const product = getProductData();

    const isEditing = Boolean(editingProductId);

    const response = isEditing
        ? await updateProduct(editingProductId, product)
        : await createProduct(product);

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
            ? "Product updated successfully."
            : AUTH_ALERT.Success.ProductCreated,
        "success",
    );

    return true;
}

/*
|--------------------------------------------------------------------------
| Initialization
|--------------------------------------------------------------------------
*/

export function initializeProductForm({ onSaved }) {
    createProductFormIcons();

    addProductButton.addEventListener("click", openCreateModal);

    closeProductModal.addEventListener("click", closeModal);

    cancelProductButton.addEventListener("click", closeModal);

    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        clearErrors();

        const isEditing = Boolean(editingProductId);

        saveProductButton.disabled = true;

        saveProductButton.textContent = isEditing ? "Updating..." : "Adding...";

        try {
            const saved = await saveProduct();

            if (!saved) {
                return;
            }

            closeModal();

            resetForm();

            onSaved();
        } catch (error) {
            showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
        } finally {
            saveProductButton.disabled = false;

            saveProductButton.textContent = isEditing
                ? "Update Product"
                : "Add Product";
        }
    });

    return openEditModal;
}
