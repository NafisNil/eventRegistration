<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;


#[Fillable(['name', 'email', 'subject', 'message', 'phone'])]
class ContactUs extends Model
{
    //
}
