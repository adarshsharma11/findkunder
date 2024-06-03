<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

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

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'customer_lead');
    }

    public function findBestMatches($locationId)
    {
        $customers = Customer::with(['person', 'customerTypes', 'categories'])->get();
        $groupedMatches = [
            'best' => [],
            'average' => [],
            'worse' => []
        ];

        foreach ($customers as $customer) {
            $score = $this->getMatchingScore($customer, $locationId);
            $match = [
                'customer' => $customer,
                'score' => $score,
            ];

            if ($score >= 15) {
                $groupedMatches['best'][] = $match;
            } elseif ($score >= 5 && $score < 15) {
                $groupedMatches['average'][] = $match;
            } else {
                $groupedMatches['worse'][] = $match;
            }
        }

        return $groupedMatches;
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
            $score += 15;
        }

        return $score;
    }
}
