<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $userRole = Role::create([
            'name' => 'user',
            'guard_name' => 'web', 
        ]);

        $managerRole = Role::create([
            'name' => 'staff',
            'guard_name' => 'web',
        ]);
    }
}
