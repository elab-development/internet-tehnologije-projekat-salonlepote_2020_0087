<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rezervacija>
 */
class RezervacijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'korisnik_id' => $this->faker->numberBetween(1, 5),
            'usluga_id' => $this->faker->numberBetween(1, 5),
            'datum' => $this->faker->date(),
            'vreme' => $this->faker->time(),
            'zaposleni_id' => 6,  
        ];
    }
}
