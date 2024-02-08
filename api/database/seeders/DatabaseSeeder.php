<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Ocena;
use App\Models\Rezervacija;
use App\Models\User;
use App\Models\Usluga;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
          //  za User model sa ulogom "admin" 1 puta
          User::factory(1)->create(['role' => 'admin']);
        //  za User model sa ulogom "korisnik" 5 puta
        User::factory(5)->create(['role' => 'korisnik']);
       

        //  za User model sa ulogom "sminker" 5 puta
        User::factory(5)->create(['role' => 'sminker']);

        Usluga::create([
            'naziv' => 'Šminkanje za posebne prilike',
            'opis' => 'Profesionalno šminkanje za sve vrste posebnih prilika.',
            'cena' => 50.00,
        ]);

        Usluga::create([
            'naziv' => 'Svadbeno šminkanje',
            'opis' => 'Šminkanje za venčanja i svadbeni makeup.',
            'cena' => 60.00,
        ]);

        Usluga::create([
            'naziv' => 'Dnevno šminkanje',
            'opis' => 'Svakodnevna dnevna šminka za sve prilike.',
            'cena' => 40.00,
        ]);

        Usluga::create([
            'naziv' => 'Usluga 4',
            'opis' => 'Opis usluge 4',
            'cena' => 80.00,
        ]);

        Usluga::create([
            'naziv' => 'Usluga 5',
            'opis' => 'Opis usluge 5',
            'cena' => 90.00,
        ]);
        Usluga::create([
            'naziv' => 'Tretman lica: Hidratacija',
            'opis' => 'Dubinska hidratacija kože lica uz korišćenje visokokvalitetnih proizvoda.',
            'cena' => 70.00,
        ]);

        Usluga::create([
            'naziv' => 'Tretman lica: Čišćenje pora',
            'opis' => 'Profesionalno čišćenje pora lica uz upotrebu blagih i efikasnih preparata.',
            'cena' => 55.00,
        ]);

        Usluga::create([
            'naziv' => 'Manikir',
            'opis' => 'Uslužno sređivanje noktiju na rukama uz oblikovanje i lakiranje.',
            'cena' => 30.00,
        ]);

        Usluga::create([
            'naziv' => 'Pedicir',
            'opis' => 'Uslužno sređivanje noktiju na nogama uz oblikovanje, uklanjanje zadebljanja i lakiranje.',
            'cena' => 35.00,
        ]);

        Usluga::create([
            'naziv' => 'Masaža leđa',
            'opis' => 'Relaksirajuća masaža leđa radi oslobađanja od napetosti i bolova.',
            'cena' => 40.00,
        ]);

        Usluga::create([
            'naziv' => 'Depilacija: Noge',
            'opis' => 'Uklanjanje dlačica sa nogu koristeći metode depilacije prilagođene vašim potrebama.',
            'cena' => 25.00,
        ]);

        Usluga::create([
            'naziv' => 'Depilacija: Bikini zona',
            'opis' => 'Precizno uklanjanje dlačica sa bikini zone za besprekorni izgled.',
            'cena' => 35.00,
        ]);


        // Pozovite factory za Rezervacija model
        Rezervacija::factory(50)->create();

        // Pozovite factory za Ocena model
         Ocena::factory(10)->create();
    }
}
