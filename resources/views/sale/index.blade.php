@extends('layout.dashboard')

@section('breadcrumb')
<span>Sales</span>
@endsection

@section('content')
@include('sale.components.tabs')

<div class="tab-content">
    @include('sale.components.sales-list')
    @include('sale.components.new-sale')
</div>

@include('sale.components.quick-customer-modal')
@include('sale.components.view-sale-modal')
@endsection

@push('scripts')
@vite('resources/js/sale/sale.js')
@endpush