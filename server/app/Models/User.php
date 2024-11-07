<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'usertype_id',
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'usertype_name',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    // Relationships
    public function usertype()
    {
        return $this->belongsTo(Usertype::class);
    }

    
    public function serviceProviderProfile()
    {
        return $this->hasOne(ServiceProvider::class, 'user_id'); // Adjust the foreign key if needed
    }

    public function serviceProvider()
    {
        return $this->hasOne(ServiceProvider::class);
    }

    // Accessors
    public function getUsertypeNameAttribute()
    {
        return $this->usertype()->first()->name;
    }
}
