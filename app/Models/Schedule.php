<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['time', 'badge', 'title', 'description', 'location', 'keynote_speaker'])]
class Schedule extends Model
{
    //
}
