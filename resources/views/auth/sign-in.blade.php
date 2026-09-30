<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Sign In</title>

    @vite('resources/css/auth.css')
</head>

<body>

    <main class="auth-container">

        <section class="auth-card">

            <header class="auth-header">
                <h1>Welcome back</h1>
                <p>Sign in to continue to your account.</p>
            </header>

            <div id="message" class="message"></div>

            <div class="field">
                <label for="email">Email</label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    autocomplete="email">
            </div>

            <div class="field">
                <label for="password">Password</label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autocomplete="current-password">
            </div>

            <button
                type="button"
                id="signInButton"
                class="auth-button">
                Sign In
            </button>

            <footer class="auth-footer">
                Don't have an account?
                <a href="{{ route('signUp') }}">Sign Up</a>
            </footer>

        </section>

    </main>

    @vite('resources/js/auth/sign-in.js')

</body>

</html>