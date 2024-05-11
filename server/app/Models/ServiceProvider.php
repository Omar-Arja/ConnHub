<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProvider extends Model
{
    use HasFactory;

    protected $with = ['user'];

    protected $fillable = [
        'user_id',
        'service_name',
        'service_description',
        'service_category',
        'location',
        'service_price_min',
        'service_price_max',
        'calendly_link',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
