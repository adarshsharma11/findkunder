<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'contact_name',
        'contact_email',
        'contact_phone',
        'cvr_number',
        'do_not_contact',
        'physical_attendance_required',
        'physical_attendance_details',
        'specific_preferences',
        'street',
        'city',
        'postal_code',
        'customer_type_id',
        'who_do_you_need',
        'location_id',
        'user_id',
        'status',
        'website',
    ];           

    public function customerType()
    {
        return $this->belongsTo(CustomerType::class);
    }

    public function location()
    {
        return $this->belongsTo(CustomerLocation::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'lead_category');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
