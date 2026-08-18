<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['address', 'phone', 'email', 'map'])]
class Location extends Model
{
    //
}
