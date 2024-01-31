<?php

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
Route::resource('usluge', UslugaController::class)->except(['create', 'edit']);
Route::get('/rezervacije', [RezervacijaController::class, 'index']);
Route::get('/rezervacije/{id}', [RezervacijaController::class, 'show']);
Route::post('/rezervacije', [RezervacijaController::class, 'store']);
Route::put('/rezervacije/{id}', [RezervacijaController::class, 'update']);
Route::delete('/rezervacije/{id}', [RezervacijaController::class, 'destroy']);