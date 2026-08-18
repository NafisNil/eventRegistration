<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['facebook', 'linkedin', 'youtube', 'twitter'])]
class SocialMedia extends Model
{
    //
}
