<div
    class="modal fade"
    id="quickCustomerModal"
    tabindex="-1"
    aria-labelledby="quickCustomerModalLabel"
    aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <div>
                    <h2
                        class="modal-title fs-5"
                        id="quickCustomerModalLabel">
                        Add Customer
                    </h2>

                    <p class="text-muted mb-0">
                        Add a customer without leaving the sale.
                    </p>
                </div>

                <button
                    type="button"
                    class="btn-close"
                    id="closeQuickCustomerModal"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>

            </div>

            <form id="quickCustomerForm">

                <div class="modal-body">

                    <div class="mb-3">

                        <label
                            for="quickCustomerName"
                            class="form-label">
                            Customer Name
                        </label>

                        <input
                            type="text"
                            id="quickCustomerName"
                            name="name"
                            class="form-control"
                            placeholder="Enter customer name">

                        <span
                            id="quickCustomerNameError"
                            class="field-error"></span>

                    </div>

                    <div class="mb-3">

                        <label
                            for="quickCustomerPhone"
                            class="form-label">
                            Phone
                        </label>

                        <input
                            type="text"
                            id="quickCustomerPhone"
                            name="phone"
                            class="form-control"
                            placeholder="Enter phone number">

                        <span
                            id="quickCustomerPhoneError"
                            class="field-error"></span>

                    </div>

                </div>

                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        id="cancelQuickCustomerButton"
                        data-bs-dismiss="modal">
                        Cancel
                    </button>

                    <button
                        type="submit"
                        id="saveQuickCustomerButton"
                        class="btn btn-primary">
                        Add Customer
                    </button>

                </div>

            </form>

        </div>

    </div>

</div>