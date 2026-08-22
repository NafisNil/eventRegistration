<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'email', 'phone', 'gender', 'organization', 'designation', 'district', 'address', 'logo', 'other_info', 'unique_code', 'participation_type_id'])]
class UserRegistration extends Model
{
    //
    public function participantType()
    {
        return $this->belongsTo(ParticipantType::class, 'participation_type_id');
    }
}
