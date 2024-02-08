<?php

namespace App\Http\Controllers;

use App\Models\Rezervacija;
use Illuminate\Http\Request;
use App\Http\Resources\RezervacijaResource;
use App\Mail\RezervacijaConfirmation;
use App\Models\User;
use App\Models\Usluga;
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
    public function getReservationsByEmployee(Request $request) //vraca sve rezervacije od ulogovanog zaposlenog 
    {
        try {
            // Uzmi ulogovanog korisnika
            $user = $request->user();
    
            // Proveri da li je ulogovani korisnik sminker
            if ($user->role !== 'sminker') {
                return response()->json(['error' => 'Nemate pristup ovom resursu'], 403);
            }
    
            // Vrati sve rezervacije gde je zaposleni_id jednak id-ju ulogovanog zaposlenog
            $rezervacije = Rezervacija::where('zaposleni_id', $user->id)->get();
            
            return RezervacijaResource::collection($rezervacije);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Rezervacije not found'], 404);
        }
    }
    public function store(Request $request)
    {
        // Uzmi ulogovanog korisnika
        $user = $request->user();
    
        $validator = Validator::make($request->all(), [
            'usluga_id' => 'required|exists:uslugas,id',
            'datum' => 'required|date|after_or_equal:today',
            'vreme' => 'required|date_format:H:i',
            'zaposleni_id' => [
                'required',
                'exists:users,id',
                // Dodajemo pravilo za proveru preklapanja termina
                function ($attribute, $value, $fail) use ($request) {
                    $startDateTime = Carbon::createFromFormat('Y-m-d H:i', $request->datum . ' ' . $request->vreme);
                    $endDateTime = (clone $startDateTime)->addHour(); // Usluga traje 1 sat
    
                    // Provera postojanja rezervacije koja se preklapa
                    $existingReservation = Rezervacija::where('zaposleni_id', $request->zaposleni_id)
                        ->where(function ($query) use ($startDateTime, $endDateTime) {
                            $query->whereBetween('datum', [$startDateTime, $endDateTime])
                                ->orWhereBetween('vreme', [$startDateTime->format('H:i'), $endDateTime->format('H:i')]);
                        })->exists();
    
                    if ($existingReservation) {
                        $fail('Zaposleni je već rezervisan u odabranom terminu.');
                    }
                },
            ],
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        // Postavi korisnika na ulogovanog korisnika
        $request->merge(['korisnik_id' => $user->id]);
    
        $rezervacija = Rezervacija::create($request->all());
    
        // Sada još i šaljemo rezervaciju na mejl 
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
    public function adminStatistike()
{
    try {
        $statistike = [];

        // Ukupan broj zaposlenih
        $statistike['ukupan_broj_zaposlenih'] = User::where('role', 'sminker')->count();

        // Ukupan broj usluga
        $statistike['ukupan_broj_usluga'] = Usluga::count();

        // Ukupan broj korisnika
        $statistike['ukupan_broj_korisnika'] = User::where('role', 'korisnik')->count();

      
        // Ukupan broj rezervacija za svaku uslugu
        $usluge = Usluga::withCount('rezervacije')->get();
        $statistike['ukupan_broj_rezervacija_po_usluzi'] = $usluge->pluck('rezervacije_count', 'naziv');
       
        // Ukupan broj rezervacija po zaposlenom
        $zaposleni = User::where('role', 'sminker')->withCount('rezervacije')->get();
        $statistike['ukupan_broj_rezervacija_po_zaposlenom'] = $zaposleni->pluck('rezervacije_count', 'name');
      
        // Prosecna ocena po usluzi
        $usluge = Usluga::with(['ocene' => function ($query) {
            $query->selectRaw('usluga_id, avg(ocena) as prosecna_ocena')->groupBy('usluga_id');
        }])->get();
        
        $statistike['prosecna_ocena_po_usluzi'] = $usluge->mapWithKeys(function ($usluga) {
            return [$usluga->naziv => $usluga->ocene->isNotEmpty() ? round($usluga->ocene->first()->prosecna_ocena, 2) : null];
        });
        
     
        return response()->json($statistike, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Greška prilikom dobavljanja statistika.'], 500);
    }
}

}
