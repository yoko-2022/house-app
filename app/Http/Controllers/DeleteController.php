<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;

class DeleteController extends Controller
{
    public function destroy($id)
    {
        $data = Form::find($id);
        if (!$data) {
            return response()->json(
                ["message" => "指定されたデータが存在しません"],
                404
            );
        }

        $data->delete();

        return response()->json(["message" => "データを削除しました"]);
    }
}
