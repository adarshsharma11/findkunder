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
        'attachments_per_year',
        'employees_count',
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
        return $this->belongsToMany(Category::class, 'lead_category')->with('subcategories');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'customer_lead');
    }

    public function findBestMatches($locationId)
    {
        $customers = Customer::with(['person', 'customerTypes', 'categories', 'company'])->get();

        foreach ($customers as $customer) {
            $score = $this->getMatchingScore($customer, $locationId);
            $matches[] = [
                'customer' => $customer,
                'score' => $score,
            ];
        }
        usort($matches, function ($a, $b) {
            return $b['score'] <=> $a['score'];
        });    
        return $matches;
    }

    public function getMatchingScore($customer, $locationId)
    {
        $score = 0;

        // Ensure we have collections to work with
        $leadCustomerTypes = $this->customerType->pluck('id');
        $customerCustomerTypes = $customer->customerTypes->pluck('id');
        $leadCategories = $this->categories->pluck('id');
        $customerCategories = $customer->categories->pluck('id');

        // Calculate the score based on common customer types
        $commonCustomerTypesCount = $leadCustomerTypes->intersect($customerCustomerTypes)->count();
        $score += $commonCustomerTypesCount * 5;

        // Calculate the score based on common categories
        $commonCategoriesCount = $leadCategories->intersect($customerCategories)->count();
        $score += $commonCategoriesCount  * 5;

        // Add score for physical attendance requirement
        if ($this->physical_attendance_required && $customer->physical_attendance_available) {
            $score += 10;
        }

        // Add score for location
        if ($locationId && $this->location_id === $locationId) {
            $score += 10;
        }

        return $score;
    }
}
