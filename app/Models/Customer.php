<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'person_id',
        'notes',
        'user_id',
        'status',
    ];

    public function person()
    {
        return $this->belongsTo(ContactPerson::class, 'person_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
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
