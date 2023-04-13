<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController; 
use App\Http\Controllers\ReportController; 

Route::post('/form', [FormController::class, 'store']);

Route::get('/report/{selectMonth}', [ReportController::class, 'input']);