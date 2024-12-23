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
        'website',
        'linkedin',
        'facebook',
        'image',
        'user_id',
        'description',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'company_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function locations()
    {
        return $this->hasMany(CompanyLocation::class, 'company_id', 'id');
    }
    public function contactPersons()
    {
        return $this->hasManyThrough(ContactPerson::class, CompanyLocation::class, 'company_id', 'location_id', 'id', 'id');
    }


}
