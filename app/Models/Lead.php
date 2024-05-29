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
        'company_description',
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

    public function getMatchingScore(Customer $customer)
    {
        $score = 0;
        // Location match
        // $leadLocationId = $this->location_id; // Assuming location_id is the foreign key column
        // die($leadLocationId);
        // $customerLocationIds = $customer->customerLocations->pluck('id')->toArray();
        // if (in_array($leadLocationId, $customerLocationIds)) {
        //     $score += 30;
        // }

        // Customer type match
        $leadCustomerTypes = $this->customerType->pluck('id')->toArray();
        $customerCustomerTypes = $customer->customerTypes->pluck('id')->toArray();
        $commonCustomerTypes = array_intersect($leadCustomerTypes, $customerCustomerTypes);
        $score += count($commonCustomerTypes) * 10;

        // Category match
        $leadCategories = $this->categories->pluck('id')->toArray();
        $customerCategories = $customer->categories->pluck('id')->toArray();
        $commonCategories = array_intersect($leadCategories, $customerCategories);
        $score += count($commonCategories) * 5;

        // Physical attendance requirement
        if ($this->physical_attendance_required && $customer->physical_attendance_available) {
            $score += 20;
        }


        return $score;
    }
}
