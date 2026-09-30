<section
    id="newSaleSection"
    class="tab-pane fade"
    role="tabpanel"
    aria-labelledby="newSaleTab">

    <div class="mb-3">

        <h2 class="h4 mb-1">
            New Sale
        </h2>

        <p class="text-muted mb-0">
            Create a new sale for a customer.
        </p>

    </div>

    <div class="card">

        <div class="card-body p-4">

            <form id="saleForm">

                {{-- Customer --}}

                <div class="mb-4">

                    <div class="d-flex justify-content-between align-items-center mb-2">

                        <label
                            for="customerSearch"
                            class="form-label mb-0">
                            Customer
                        </label>

                        <button
                            type="button"
                            id="addCustomerFromSale"
                            class="btn btn-link btn-sm text-decoration-none p-0">
                            <i data-lucide="plus"></i>
                            Add Customer
                        </button>

                    </div>

                    <div class="search-select">

                        <div class="search-input-wrapper">

                            <i data-lucide="search"></i>

                            <input
                                type="text"
                                id="customerSearch"
                                class="form-control"
                                placeholder="Search customer by name or phone..."
                                autocomplete="off">

                        </div>

                        <div
                            id="customerSearchResults"
                            class="search-results d-none"></div>

                    </div>

                    <div
                        id="selectedCustomer"
                        class="selected-customer d-none"></div>

                    <span
                        id="customer_error"
                        class="field-error"></span>

                </div>

                {{-- Products --}}

                <div class="mb-4">

                    <div class="mb-2">

                        <h3 class="h6 mb-1">
                            Products
                        </h3>

                        <p class="text-muted small mb-0">
                            Search and add products to this sale.
                        </p>

                    </div>

                    <div class="search-select">

                        <div class="search-input-wrapper">

                            <i data-lucide="search"></i>

                            <input
                                type="text"
                                id="productSearch"
                                class="form-control"
                                placeholder="Search product..."
                                autocomplete="off">

                        </div>

                        <div
                            id="productSearchResults"
                            class="search-results d-none"></div>

                    </div>

                    <div
                        id="saleItems"
                        class="sale-items mt-3"></div>

                    <div
                        id="saleItemsEmpty"
                        class="border rounded p-4 text-center text-muted mt-3">
                        No products added yet.
                    </div>

                </div>

                {{-- Total --}}

                <div class="border-top pt-3 mb-4">

                    <div class="d-flex justify-content-end align-items-center gap-3">

                        <span class="text-muted">
                            Total
                        </span>

                        <strong
                            id="saleTotal"
                            class="fs-5">
                            Rs. 0.00
                        </strong>

                    </div>

                </div>

                {{-- Actions --}}

                <div class="d-flex justify-content-end gap-2">

                    <button
                        type="button"
                        id="clearSaleButton"
                        class="btn btn-secondary">
                        Clear
                    </button>

                    <button
                        type="submit"
                        id="saveSaleButton"
                        class="btn btn-primary">
                        Create Sale
                    </button>

                </div>

            </form>

        </div>

    </div>

</section>