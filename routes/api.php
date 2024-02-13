<?php
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\ContactPersonController;
use App\Http\Controllers\API\CustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::apiResource('/companies', CompanyController::class);
        Route::put('/update-profile', [AuthController::class, 'update']);
        Route::apiResource('/contact-person', ContactPersonController::class);
        Route::apiResource('/customers', CustomerController::class); 
        Route::post('/logout', [AuthController::class, 'logoutUser']);
        Route::post('/me', [AuthController::class, 'me']);
    });

