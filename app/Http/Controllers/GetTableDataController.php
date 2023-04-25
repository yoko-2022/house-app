<?php

namespace App\Http\Controllers;

use App\Models\GetTableData;
use Illuminate\Http\Request;

class GetTableDataController extends Controller
{
    public function index()
    {
        //tableデータを取得する
        $tests = GetTableData::get();
        //取得したデータを返却する
        return $tests;
    }
}
