<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'cvr',
        'street',
        'postal_code',
        'city',
        'location',
        'website',
        'linkedin',
        'facebook',
    ];

    /**
     * Get the contact persons for the company.
     */
    public function contactPersons()
    {
        return $this->hasMany(ContactPerson::class);
    }
}
