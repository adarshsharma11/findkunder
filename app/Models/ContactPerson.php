<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactPerson extends Model
{
    use HasFactory;
    protected $table = 'contact_person';
    
    protected $fillable = [
        'first_name',
        'last_name',
        'title',
        'email',
        'phone',
        'linkedin',
        'comment',
        'image',
        'user_id',
        'location_id'
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'person_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function location()
    {
        return $this->belongsTo(CompanyLocation::class, 'location_id');
    }
    public function services()
    {
        return $this->belongsToMany(Category::class, 'contact_person_category', 'contact_person_id', 'category_id');
    }
    public function customerTypes()
    {
        return $this->belongsToMany(CustomerType::class, 'contact_person_customer_type', 'contact_person_id', 'customer_type_id');
    }

    
}
