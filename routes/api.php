<?php
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\Admin\CustomerTypeController;
use App\Http\Controllers\API\ContactPersonController;
use App\Http\Controllers\API\Admin\CategoryController;
use App\Http\Controllers\API\Admin\AccountController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\Admin\CustomerLocationController;

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
    Route::get('/customers/count', [AuthController::class, 'countAllProfiles']);
    Route::apiResource('customerLocations', CustomerLocationController::class);
    Route::apiResource('customerTypes', CustomerTypeController::class);
    Route::apiResource('categories', CategoryController::class);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::apiResource('/companies', CompanyController::class);
        Route::post('/delete-profile', [AuthController::class, 'softDeleteUser']);
        Route::put('/update-profile', [AuthController::class, 'update']);
        Route::apiResource('/contact-person', ContactPersonController::class);
        Route::apiResource('/customers', CustomerController::class); 
        Route::apiResource('/accounts', AccountController::class); 
        Route::post('/logout', [AuthController::class, 'logoutUser']);
        Route::post('/me', [AuthController::class, 'me']);
    });

