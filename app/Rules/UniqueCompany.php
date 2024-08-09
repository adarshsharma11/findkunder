<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Company;

class UniqueCompany implements Rule
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function passes($attribute, $value)
    {
        $query = Company::query();

        $fieldsToCheck = ['name', 'cvr', 'street', 'postal_code', 'city'];
        
        foreach ($fieldsToCheck as $field) {
            if (!empty($this->request->$field)) {
                $query->where($field, $this->request->$field);
            }
        }

        return !$query->exists();
    }

    public function message()
    {
        return 'The company details must be unique. At least one of the fields (name, cvr, street, postal_code, city) must be different from existing records.';
    }
}
