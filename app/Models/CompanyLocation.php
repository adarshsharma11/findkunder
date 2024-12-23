<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'street',
        'postal_code',
        'city',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function contactPersons()
    {
        return $this->hasMany(ContactPerson::class, 'location_id', 'id');
    }
}
