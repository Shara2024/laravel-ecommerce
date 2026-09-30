<section
    id="salesListSection"
    class="tab-pane fade show active"
    role="tabpanel"
    aria-labelledby="salesListTab">

    <div class="d-flex justify-content-between align-items-center mb-3">

        <div>
            <h2 class="h4 mb-1">
                Sales List
            </h2>

            <p class="text-muted mb-0">
                View your completed sales.
            </p>
        </div>

        <button
            type="button"
            id="newSaleButton"
            class="btn btn-primary">
            <i data-lucide="plus"></i>
            New Sale
        </button>

    </div>

    <div class="card">

        <div class="card-body p-0">

            <div class="table-responsive">

                <table
                    id="salesTable"
                    class="table table-hover align-middle mb-0"
                    style="width: 100%;">

                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th class="text-end">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody></tbody>

                </table>

            </div>

        </div>

    </div>

</section>