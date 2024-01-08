<?php
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\ContactPersonController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
    Route::post('/login', [AuthController::class, 'login']);
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::apiResource('/companies', CompanyController::class);
        Route::apiResource('/contact-person', ContactPersonController::class);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/me', [AuthController::class, 'me']);
    });

