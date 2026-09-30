@extends('layout.dashboard')

@section('breadcrumb')
<span>Products</span>
@endsection

@section('content')

<div class="page-header">

    <div>
        <h1>Products</h1>
        <p>Manage your products.</p>
    </div>

    <button
        type="button"
        id="addProductButton"
        class="primary-button">

        <i data-lucide="plus"></i>

        Add Product

    </button>

</div>


<div class="product-card">

    <div class="table-responsive">

        <table
            id="productsTable"
            class="table table-hover align-middle mb-0"
            style="width: 100%;">

            <thead>

                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Created</th>
                    <th class="text-end">Actions</th>
                </tr>

            </thead>

            <tbody>
            </tbody>

        </table>

    </div>

</div>

<div
    class="modal"
    id="productModal"
    aria-hidden="true">

    <div class="modal-content">

        <div class="modal-header">

            <div>
                <h2 id="productModalTitle">
                    Add Product
                </h2>

                <p id="productModalDescription">
                    Create a new product.
                </p>
            </div>

            <button
                type="button"
                id="closeProductModal"
                class="modal-close"
                aria-label="Close">

                <i data-lucide="x"></i>

            </button>

        </div>

        <form id="productForm">

            <div class="form-group">

                <label for="name">
                    Product Name
                </label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter product name">

                <span
                    id="name_error"
                    class="field-error">
                </span>

            </div>

            <div class="form-group">

                <label for="price">
                    Price
                </label>

                <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    placeholder="0.00">

                <span
                    id="price_error"
                    class="field-error">
                </span>

            </div>


            <div class="form-group">

                <label for="stock">
                    Stock
                </label>

                <input
                    type="number"
                    id="stock"
                    name="stock"
                    min="0"
                    placeholder="0">

                <span
                    id="stock_error"
                    class="field-error">
                </span>

            </div>

            <div class="modal-actions">

                <button
                    type="button"
                    id="cancelProductButton"
                    class="secondary-button">

                    Cancel

                </button>


                <button
                    type="submit"
                    id="saveProductButton"
                    class="primary-button">

                    Add Product

                </button>

            </div>

        </form>

    </div>

</div>

@endsection


@push('scripts')

@vite('resources/js/product/product.js')

@endpush