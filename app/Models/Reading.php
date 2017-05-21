<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reading extends Model
{
    protected $fillable = ['type','account','date','reading'];
}
