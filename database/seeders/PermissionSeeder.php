<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'view', 'guard_name' => 'web',]);
        Permission::create(['name' => 'create', 'guard_name' => 'web',]);
        Permission::create(['name' => 'edit', 'guard_name' => 'web',]);
        Permission::create(['name' => 'delete', 'guard_name' => 'web',]);
    }
}
