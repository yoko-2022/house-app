<?php

use Illuminate\Support\Facades\Route;
use App\Exceptions\CustomException;

Route::get('/', function () {
    return view('welcome');
});