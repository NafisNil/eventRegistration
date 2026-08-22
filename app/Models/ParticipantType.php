<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name'])]
class ParticipantType extends Model
{
    //
    public function userRegistrations()
    {
        return $this->hasMany(UserRegistration::class, 'participation_type_id');
    }
}
