<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RezervacijaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'datum' => $this->datum,
            'vreme' => $this->vreme,
            'korisnik' => new UserResource($this->korisnik),
            'zaposleni' => new UserResource($this->zaposleni  ),
            'usluga' => new UslugaResource($this->usluga),
          
        ];
    }
}
