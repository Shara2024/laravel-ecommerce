<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Sign Up</title>

    @vite('resources/css/auth.css')
</head>

<body>

    <main class="auth-container">

        <section class="auth-card">

            <header class="auth-header">
                <h1>Create your account</h1>
                <p>Enter your details below to get started.</p>
            </header>

            <div id="message" class="message"></div>

            <div class="name-fields">

                <div class="field">
                    <label for="first_name">First Name</label>

                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="John"
                        autocomplete="given-name">

                    <p id="first_name_error" class="error-message"></p>
                </div>

                <div class="field">
                    <label for="last_name">Last Name</label>

                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Doe"
                        autocomplete="family-name">

                    <p id="last_name_error" class="error-message"></p>
                </div>

            </div>

            <div class="field">
                <label for="email">Email</label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    autocomplete="email">

                <p id="email_error" class="error-message"></p>
            </div>

            <div class="field">
                <label for="password">Password</label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="At least 8 characters"
                    autocomplete="new-password">

                <p id="password_error" class="error-message"></p>
            </div>

            <div class="field">
                <label for="password_confirmation">Confirm Password</label>

                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Re-enter your password"
                    autocomplete="new-password">

                <p id="password_confirmation_error" class="error-message"></p>
            </div>

            <button
                type="button"
                id="signUpButton"
                class="auth-button">
                Create Account
            </button>

            <footer class="auth-footer">
                Already have an account?
                <a href="{{ route('signIn') }}">Sign In</a>
            </footer>

        </section>

    </main>

    @vite('resources/js/auth/sign-up.js')

</body>

</html>