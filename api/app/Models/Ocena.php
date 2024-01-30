<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ocena extends Model
{
    use HasFactory;
    protected $fillable = [
        'korisnik_id', 'usluga_id', 'ocena', 'komentar',  
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'korisnik_id');
    }

    public function service()
    {
        return $this->belongsTo(Usluga::class, 'usluga_id');
    }
}
