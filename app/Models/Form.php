<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    protected $table = 'data';
    protected $fillable = ['tab', 'item', 'date', 'amount', 'memo'];
    use HasFactory;
}

class Data extends Model
{
    use HasFactory;

    protected $table = 'data';
}