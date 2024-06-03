<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerLead extends Model
{
    use HasFactory;

    protected $table = 'customer_lead';

    protected $fillable = [
        'customer_id',
        'lead_id',
    ];
}
