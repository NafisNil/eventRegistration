<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name'])]
class PartnershipCategory extends Model
{
    //
    public function partners()
    {
        return $this->hasMany(Partner::class);
    }
}
