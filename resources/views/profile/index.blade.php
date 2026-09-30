@extends('layout.dashboard')

@section('breadcrumb')

<a href="{{ route('dashboard') }}">
    Dashboard
</a>

<span>/</span>

<span class="breadcrumb-current">
    Profile
</span>

@endsection

@section('content')

<section class="page-header">

    <h1>Profile</h1>

    <p>
        View your account information.
    </p>

</section>


<section class="profile-card">

    <div class="profile-header">

        <div class="profile-avatar">
            <i data-lucide="user"></i>
        </div>

        <div>
            <h2>
                {{ auth()->user()->first_name }}
                {{ auth()->user()->last_name }}
            </h2>

            <p>
                {{ auth()->user()->email }}
            </p>
        </div>

    </div>


    <div class="profile-details">

        <div class="profile-field">
            <span class="profile-label">
                First Name
            </span>

            <span class="profile-value">
                {{ auth()->user()->first_name }}
            </span>
        </div>


        <div class="profile-field">
            <span class="profile-label">
                Last Name
            </span>

            <span class="profile-value">
                {{ auth()->user()->last_name }}
            </span>
        </div>


        <div class="profile-field">
            <span class="profile-label">
                Email
            </span>

            <span class="profile-value">
                {{ auth()->user()->email }}
            </span>
        </div>


        <div class="profile-field">
            <span class="profile-label">
                Member Since
            </span>

            <span class="profile-value">
                {{ auth()->user()->created_at->format('F d, Y') }}
            </span>
        </div>

    </div>

</section>

@endsection