<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OcenaController;
use App\Http\Controllers\RezervacijaController;
use App\Http\Controllers\UslugaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']); 
Route::resource('usluge', UslugaController::class)->except(['create', 'edit']);
 

Route::get('/ocene', [OcenaController::class, 'index']);
Route::get('/ocene/{id}', [OcenaController::class, 'show']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/rezervacije', [RezervacijaController::class, 'index']);
    Route::get('/rezervacije/{id}', [RezervacijaController::class, 'show']);
    Route::post('/rezervacije', [RezervacijaController::class, 'store']);
    Route::put('/rezervacije/{id}', [RezervacijaController::class, 'update']);
    Route::delete('/rezervacije/{id}', [RezervacijaController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);

   
    Route::post('/ocene', [OcenaController::class, 'store']);
    Route::put('/ocene/{id}', [OcenaController::class, 'update']);
    Route::delete('/ocene/{id}', [OcenaController::class, 'destroy']);
});
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Rute dostupne samo administratorima
});

Route::middleware(['auth:sanctum', 'role:sminker'])->group(function () {
    // Rute dostupne samo šminkerima
});

Route::middleware(['auth:sanctum', 'role:korisnik'])->group(function () {
    // Rute dostupne samo običnim korisnicima
});
