<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Carbon\Carbon;

class FormController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tab' => 'required|string|max:50',
            'item' => 'required|string|max:50',
            'date' => 'required|date_format:Y-m-d',
            'amount' => 'required|numeric',
            'memo' => 'nullable|string|max:255',
        ]);

        $form = Form::create([
            'tab' => $validatedData['tab'],
            'item' => $validatedData['item'],
            'date' => Carbon::createFromFormat('Y-m-d', $validatedData['date']),
            'amount' => $validatedData['amount'],
            'memo' => $validatedData['memo'],
        ]);

        return response()->json([
            'id' => $form->id,
            'tab' => $form->tab,
            'item' => $form->item,
            'date' => $form->date,
            'amount' => $form->amount,
            'memo' => $form->memo,
            'created_at' => $form->created_at,
            'updated_at' => $form->updated_at,
        ]);
    }
}