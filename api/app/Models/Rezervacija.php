<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rezervacija extends Model
{
    use HasFactory;
    protected $fillable = [
        'korisnik_id', 'usluga_id', 'datum', 'vreme','zaposleni_id',  
    ];
    public function korisnik()
    {
        return $this->belongsTo(User::class, 'korisnik_id');
    }
    public function zaposleni()
    {
        return $this->belongsTo(User::class, 'zaposleni_id');
    }
    public function usluga()
    {
        return $this->belongsTo(Usluga::class, 'usluga_id');
    }
}
