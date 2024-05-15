<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usertype;

class UsertypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usertypes = [
            'Admin',
            'Pending',
            'Client',
            'Service Provider',
        ];

        foreach ($usertypes as $usertype) {
            Usertype::create([
                'name' => $usertype,
            ]);
        }
    }
}
