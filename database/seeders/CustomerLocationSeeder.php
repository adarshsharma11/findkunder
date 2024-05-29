<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CustomerLocation;

class CustomerLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['name' => 'New York'],
            ['name' => 'Los Angeles'],
        ];

        foreach ($locations as $location) {
            CustomerLocation::create($location);
        }
    }
}
