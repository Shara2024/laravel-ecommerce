<div
    class="modal fade"
    id="viewSaleModal"
    tabindex="-1"
    aria-labelledby="viewSaleTitle"
    aria-hidden="true">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <div>

                    <h2
                        class="modal-title fs-5"
                        id="viewSaleTitle">
                        Sale Details
                    </h2>

                    <p
                        id="viewSaleDescription"
                        class="text-muted mb-0">
                        View sale information.
                    </p>

                </div>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>

            </div>

            <div class="modal-body">

                <div
                    id="saleDetailsLoading"
                    class="text-center py-5 d-none">
                    Loading sale details...
                </div>

                <div id="saleDetailsContent">

                    <div class="row g-4 mb-4">

                        <div class="col-md-6">

                            <div class="text-muted small">
                                Customer
                            </div>

                            <div
                                id="viewSaleCustomer"
                                class="fw-semibold">
                                -
                            </div>

                            <div
                                id="viewSalePhone"
                                class="text-muted">
                                -
                            </div>

                        </div>

                        <div class="col-md-6">

                            <div class="text-muted small">
                                Date
                            </div>

                            <div
                                id="viewSaleDate"
                                class="fw-semibold">
                                -
                            </div>

                        </div>

                    </div>

                    <div>

                        <h3 class="h6 mb-3">
                            Products
                        </h3>

                        <div class="table-responsive">

                            <table class="table table-sm align-middle">

                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th class="text-end">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>

                                <tbody id="viewSaleItems"></tbody>

                            </table>

                        </div>

                    </div>

                    <div class="border-top pt-3 mt-3">

                        <div class="d-flex justify-content-end align-items-center gap-3">

                            <span class="text-muted">
                                Total
                            </span>

                            <strong
                                id="viewSaleTotal"
                                class="fs-5">
                                Rs. 0.00
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                </button>

            </div>

        </div>

    </div>

</div>