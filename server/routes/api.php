<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ServiceProviderController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});

Route::middleware('auth:api')->group(function () {
    Route::prefix('client')->group(function () {
        // By Pending
        Route::post('profile', [ClientController::class, 'createClientProfile']);
    });

    Route::prefix('service-provider')->group(function () {
        // By Pending
        Route::post('profile', [ServiceProviderController::class, 'createServiceProviderProfile']);

        // By ServiceProvider
        Route::put('update', [ServiceProviderController::class, 'updateServiceProviderProfile']);

        // By Client
        Route::get('', [ServiceProviderController::class, 'getCurrentServiceProviderProfile']);
        Route::get('/id/{id}', [ServiceProviderController::class, 'getServiceProviderProfile']);
        Route::get('all', [ServiceProviderController::class, 'getAllServiceProviders']);
        Route::get('search', [ServiceProviderController::class, 'searchServiceProviders']);
    });
});
