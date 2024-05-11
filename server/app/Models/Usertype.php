<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usertype extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    // Relationships
    public function users()
    {
        return $this->hasMany(User::class);
    }

    // Methods
    public static function getUsertypeId($usertype)
    {
        return self::where('name', $usertype)->first()->id;
    }
}
