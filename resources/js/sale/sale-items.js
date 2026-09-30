import { createIcons, Trash2 } from "lucide";
import { searchProducts } from "../service/sale-service";
import { AUTH_ALERT } from "../constants/alerts";
import { showToast } from "../utils/toast";
import { debounce } from "../utils/debounce";

const productSearch = document.getElementById("productSearch");

const productSearchResults = document.getElementById("productSearchResults");

const saleItems = document.getElementById("saleItems");

const saleItemsEmpty = document.getElementById("saleItemsEmpty");

let saleItemsData = [];

let onChangeCallback = () => {};

function createSaleItemIcons() {
    createIcons({
        icons: {
            Trash2,
        },
    });
}

function clearProductSearch() {
    productSearch.value = "";

    productSearchResults.classList.add("d-none");

    productSearchResults.innerHTML = "";
}

function renderProductResults(products) {
    if (!products.length) {
        productSearchResults.innerHTML = `
            <div class="search-result-empty">
                No products found.
            </div>
        `;

        productSearchResults.classList.remove("d-none");

        return;
    }

    productSearchResults.innerHTML = products
        .map(
            (product) => `
                    <button
                        type="button"
                        class="search-result-item product-result"
                        data-id="${product.id}"
                    >
                        <span>
                            <strong>
                                ${product.name}
                            </strong>

                            <small>
                                Stock: ${product.stock}
                                · Rs. ${Number(product.price).toFixed(2)}
                            </small>
                        </span>
                    </button>
                `,
        )
        .join("");

    productSearchResults.classList.remove("d-none");

    productSearchResults
        .querySelectorAll(".product-result")
        .forEach((button) => {
            button.addEventListener("click", () => {
                const product = products.find(
                    (item) => String(item.id) === button.dataset.id,
                );

                addProduct(product);
            });
        });
}

const handleProductSearch = debounce(async () => {
    const search = productSearch.value.trim();

    if (!search) {
        clearProductSearch();

        return;
    }

    try {
        const { status, data } = await searchProducts(search);

        if (status >= 400) {
            showToast(AUTH_ALERT.Error.ServerError, "error");

            return;
        }

        renderProductResults(data.products);
    } catch (error) {
        showToast(AUTH_ALERT.Error.ConnectionFailed, "error");
    }
});

function addProduct(product) {
    const existingItem = saleItemsData.find(
        (item) => item.product_id === product.id,
    );

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
        }

        clearProductSearch();

        renderSaleItems();

        return;
    }

    saleItemsData.push({
        product_id: product.id,

        name: product.name,

        price: Number(product.price),

        stock: product.stock,

        quantity: 1,
    });

    clearProductSearch();

    renderSaleItems();
}

function updateQuantity(index, value) {
    const item = saleItemsData[index];

    let quantity = Number(value);

    if (quantity < 1) {
        quantity = 1;
    }

    if (quantity > item.stock) {
        quantity = item.stock;
    }

    item.quantity = quantity;

    renderSaleItems();
}

function removeProduct(index) {
    saleItemsData.splice(index, 1);

    renderSaleItems();

    productSearch.focus();
}

function renderSaleItems() {
    saleItems.innerHTML = "";

    saleItemsEmpty.classList.toggle("d-none", saleItemsData.length > 0);

    saleItemsData.forEach((item, index) => {
        const row = document.createElement("div");

        row.className = "sale-item-row";

        row.innerHTML = `
                <div class="sale-item-product">

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        Rs. ${item.price.toFixed(2)}
                    </span>

                </div>

                <div class="sale-item-stock">

                    <small>
                        Stock
                    </small>

                    <span>
                        ${item.stock}
                    </span>

                </div>

                <div class="sale-item-quantity">

                    <small>
                        Quantity
                    </small>

                    <input
                        type="number"
                        class="sale-quantity"
                        min="1"
                        max="${item.stock}"
                        value="${item.quantity}"
                    >

                </div>

                <div class="sale-item-subtotal">

                    <small>
                        Subtotal
                    </small>

                    <strong>
                        Rs. ${(item.price * item.quantity).toFixed(2)}
                    </strong>

                </div>

                <button
                    type="button"
                    class="table-action-button remove-sale-item"
                    aria-label="Remove product"
                    title="Remove"
                >
                    <i data-lucide="trash-2"></i>
                </button>
            `;

        row.querySelector(".sale-quantity").addEventListener(
            "input",
            (event) => {
                updateQuantity(index, event.target.value);
            },
        );

        row.querySelector(".remove-sale-item").addEventListener("click", () => {
            removeProduct(index);
        });

        saleItems.appendChild(row);
    });

    createSaleItemIcons();

    onChangeCallback();
}

export function initializeSaleItems({ onChange }) {
    onChangeCallback = onChange;

    productSearch.addEventListener("input", handleProductSearch);

    return {
        getItems: () => saleItemsData,

        clear: () => {
            saleItemsData = [];

            saleItems.innerHTML = "";

            saleItemsEmpty.classList.remove("d-none");

            clearProductSearch();

            onChangeCallback();
        },
    };
}
