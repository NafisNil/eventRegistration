<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'email', 'phone', 'gender', 'organization', 'designation', 'district', 'address', 'logo', 'other_info', 'unique_code'])]
class UserRegistration extends Model
{
    //
}
