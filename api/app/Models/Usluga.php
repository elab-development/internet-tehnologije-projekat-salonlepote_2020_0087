<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usluga extends Model
{
    use HasFactory;
    protected $fillable = [
        'naziv', 'opis', 'cena',  
    ]; 
    public function rezervacije()
    {
        return $this->hasMany(Rezervacija::class );
    }
    public function ocene()
    {
        return $this->hasMany(Ocena::class, 'usluga_id');
    }
    
}
