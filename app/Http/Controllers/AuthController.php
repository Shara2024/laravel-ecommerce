<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signUp(RegisterRequest $request)
    {
        $user = User::create($request->validated());

        Auth::login($user);

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Account created successfully.',
            'redirect' => route('dashboard'),
        ]);
    }

    public function signIn(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Signed in successfully.',
            'redirect' => route('dashboard'),
        ]);
    }

    public function logout()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return response()->json([
            'message' => 'Signed out successfully.',
            'redirect' => route('signIn'),
        ]);
    }
}
