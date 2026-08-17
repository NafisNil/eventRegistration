<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['event_name', 'location', 'event_date', 'time', 'registration_deadline', 'target_participants'])]
class EventStat extends Model
{
    //
}
