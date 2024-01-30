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
        'image',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'company_id', 'id');
    }
}
