<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;

class ReportController extends Controller
{
    public function input($selectMonth)
    {
        $data = Form::where('date', 'LIKE', $selectMonth . '%')->get();
        return response()->json($data);
    }
}
