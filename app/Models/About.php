<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['description', 'reason_to_attend', 'objectives', 'eligibility'])]
class About extends Model
{
    //
    
}
