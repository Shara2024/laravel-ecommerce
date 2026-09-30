@extends('layout.dashboard')

@section('title', 'Customers')

@section('breadcrumb')
<span>Customers</span>
@endsection

@section('content')
<div class="page-header">
    <div>
        <h1>Customers</h1>
        <p>Manage your customers.</p>
    </div>

    <button type="button" id="addCustomerButton" class="primary-button">
        <i data-lucide="plus"></i>
        Add Customer
    </button>
</div>

<div class="product-card">
    <div class="table-responsive">
        <table id="customersTable" class="table table-hover align-middle mb-0" style="width: 100%;">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Created</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<div class="modal" id="customerModal" aria-hidden="true">
    <div class="modal-content">
        <div class="modal-header">
            <div>
                <h2 id="customerModalTitle">Add Customer</h2>
                <p id="customerModalDescription">Create a new customer.</p>
            </div>

            <button type="button" id="closeCustomerModal" class="modal-close" aria-label="Close">
                <i data-lucide="x"></i>
            </button>
        </div>

        <form id="customerForm">
            <div class="form-group">
                <label for="name">Customer Name</label>
                <input type="text" id="name" name="name" placeholder="Enter customer name">
                <span id="name_error" class="field-error"></span>
            </div>

            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" id="phone" name="phone" placeholder="Enter phone number">
                <span id="phone_error" class="field-error"></span>
            </div>

            <div class="modal-actions">
                <button type="button" id="cancelCustomerButton" class="secondary-button">Cancel</button>
                <button type="submit" id="saveCustomerButton" class="primary-button">Add Customer</button>
            </div>
        </form>
    </div>
</div>
@endsection

@push('scripts')
@vite('resources/js/customer/customer.js')
@endpush