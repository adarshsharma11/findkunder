<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'person_id',
        'notes',
        'user_id',
        'status',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function person()
    {
        return $this->belongsTo(ContactPerson::class, 'person_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
    public function customerTypes()
    {
        return $this->belongsToMany(CustomerType::class);
    }
    public function customerLocations()
    {
        return $this->belongsToMany(CustomerLocation::class);
    }
    public function leads()
    {
        return $this->belongsToMany(Lead::class, 'customer_lead');
    }
    
}
