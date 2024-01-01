<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::where('name', 'admin')->first();

        // Check if the role exists before attempting to assign it
        if ($role) {
            $adminUser = User::create([
                'name' => 'Admin User',
                'email' => 'admin@findkunder.com',
                'password' => bcrypt('dk#findkunder.2024'),
            ]);

            // Assign 'admin' role to the admin user
            $adminUser->roles()->attach($role);
        } else {
            // Handle the case where the 'admin' role does not exist
            $this->command->info('Role not found: admin');
        }
    }
}
