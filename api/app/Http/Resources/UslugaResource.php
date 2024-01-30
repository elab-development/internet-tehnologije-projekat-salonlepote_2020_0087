<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UslugaResource extends JsonResource
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
            'naziv' => $this->naziv,
            'opis' => $this->opis,
            'cena' => $this->cena,
           
        ];
    }
}
