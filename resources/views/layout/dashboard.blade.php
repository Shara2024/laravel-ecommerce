<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Chiox</title>

    @vite('resources/css/dashboard/dashboard.css')
</head>

<body>
    <div class="dashboard-layout">

        <aside class="sidebar" id="sidebar">

            <div class="sidebar-header">

                <a href="{{ route('dashboard') }}" class="brand">
                    Chiox
                </a>

                <button
                    type="button"
                    id="sidebarToggle"
                    class="sidebar-toggle"
                    aria-label="Toggle sidebar">

                    <i data-lucide="ellipsis-vertical"></i>

                </button>
            </div>


            <nav class="sidebar-nav">

                <a
                    href="{{ route('dashboard') }}"
                    class="nav-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">

                    <span class="nav-icon">
                        <i data-lucide="layout-dashboard"></i>
                    </span>

                    <span class="nav-label">
                        Dashboard
                    </span>

                </a>

                <a
                    href="{{ route('customers') }}"
                    class="nav-item {{ request()->routeIs('customers') ? 'active' : '' }}">
                    <span class="nav-icon">
                        <i data-lucide="users"></i>
                    </span>

                    <span class="nav-label">
                        Customers
                    </span>
                </a>


                <a
                    href="{{ route('product.index') }}"
                    class="nav-item {{ request()->routeIs('product.index') ? 'active' : '' }}">
                    <span class="nav-icon">
                        <i data-lucide="package"></i>
                    </span>

                    <span class="nav-label">
                        Products
                    </span>
                </a>


                <a
                    href="{{ route('sales') }}"
                    class="nav-item {{ request()->routeIs('sales') ? 'active' : '' }}">
                    <span class="nav-icon">
                        <i data-lucide="shopping-cart"></i>
                    </span>

                    <span class="nav-label">
                        Sales
                    </span>
                </a>

            </nav>


            <div class="sidebar-footer">
                <a
                    href="{{ route('profile') }}"
                    class="nav-item {{ request()->routeIs('profile') ? 'active' : '' }}">

                    <span class="nav-icon">
                        <i data-lucide="user"></i>
                    </span>

                    <span class="nav-label">
                        Profile
                    </span>

                </a>


                <button
                    type="button"
                    id="logoutButton"
                    class="logout-button">

                    <span class="nav-icon">
                        <i data-lucide="log-out"></i>
                    </span>

                    <span class="nav-label">
                        Logout
                    </span>

                </button>
            </div>

        </aside>


        <div class="main-area">

            <header class="topbar">

                <div class="breadcrumb">
                    @yield('breadcrumb')
                </div>


                <div class="user-area">

                    <span class="welcome-text">
                        Welcome, {{ auth()->user()->first_name }}
                    </span>



                </div>

            </header>


            <main class="page-content">

                @yield('content')

            </main>

        </div>

    </div>


    @vite([
    'resources/js/dashboard/dashboard.js',
    'resources/js/dashboard/logout.js'
    ])

    @stack('scripts')

</body>

</html>