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
        'company_id', // Assuming you have a foreign key to relate to the Company model
    ];

    /**
     * Get the company that owns the contact person.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    
}
