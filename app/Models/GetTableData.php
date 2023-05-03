<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GetTableData extends Model
{
  use HasFactory;
  protected $table = "data";
  protected $fillable = ["tab", "item", "date", "amount", "memo"];
}
