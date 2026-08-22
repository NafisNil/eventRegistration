<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'designation', 'description', 'logo', 'expertise', 'type'])]
class Guest extends Model
{
    //
    
}
