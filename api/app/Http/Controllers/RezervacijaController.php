<?php

namespace App\Http\Controllers;

use App\Models\Rezervacija;
use Illuminate\Http\Request;
use App\Http\Resources\RezervacijaResource;
use App\Mail\RezervacijaConfirmation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class RezervacijaController extends Controller
{
    public function index(Request $request)
    {
        // Uzmi ulogovanog korisnika
        $user = $request->user();

        // Vrati sve rezervacije tog korisnika
        $rezervacije = Rezervacija::where('korisnik_id', $user->id)->get();
        return RezervacijaResource::collection($rezervacije);
    }

    public function store(Request $request)
    {
        // Uzmi ulogovanog korisnika
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'usluga_id' => 'required|exists:uslugas,id',
            'datum' => 'required|date|after_or_equal:today',
            'vreme' => 'required',
            'zaposleni_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Postavi korisnika na ulogovanog korisnika
        $request->merge(['korisnik_id' => $user->id]);

        $rezervacija = Rezervacija::create($request->all());


        //sada jos i saljemo rezervaciju na mejl 
        Mail::to($user->email)->send(new RezervacijaConfirmation($rezervacija, $user));

        return new RezervacijaResource($rezervacija);
    }

    public function update(Request $request, $id)
    {
        try {
            // Uzmi ulogovanog korisnika
            $user = $request->user();

            $rezervacija = Rezervacija::findOrFail($id);

            // Proveri da li rezervacija pripada ulogovanom korisniku
            if ($rezervacija->korisnik_id !== $user->id) {
                return response()->json(['error' => 'Nemate pristup ovoj rezervaciji'], 403);
            }

            $validator = Validator::make($request->all(), [
                'usluga_id' => 'exists:uslugas,id',
                'datum' => 'date|after_or_equal:today',
                'vreme' => '',
                'zaposleni_id' => 'exists:users,id',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $rezervacija->update($request->all());

            return new RezervacijaResource($rezervacija);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Rezervacija not found'], 404);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            // Uzmi ulogovanog korisnika
            $user = $request->user();

            $rezervacija = Rezervacija::findOrFail($id);

            // Proveri da li rezervacija pripada ulogovanom korisniku
            if ($rezervacija->korisnik_id !== $user->id) {
                return response()->json(['error' => 'Nemate pristup ovoj rezervaciji'], 403);
            }

            // Proveri da li je rezervacija u budućnosti
            $datumRezervacije = Carbon::parse($rezervacija->datum);
            if ($datumRezervacije->isPast()) {
                return response()->json(['error' => 'Ne možete obrisati prošlu rezervaciju'], 400);
            }

            $rezervacija->delete();
            return response()->json(['message' => 'Rezervacija deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Rezervacija not found'], 404);
        }
    }
}
