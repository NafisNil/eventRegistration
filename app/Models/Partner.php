<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'partnership_category_id', 'logo', 'featured', 'link', 'eng_name'])]
class Partner extends Model
{
    //
    public function partnershipCategory()
    {
        return $this->belongsTo(PartnershipCategory::class);
    }
}
