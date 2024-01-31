<?php

namespace App\Http\Controllers;

use App\Models\Rezervacija;
use Illuminate\Http\Request;
use App\Http\Resources\RezervacijaResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RezervacijaController extends Controller
{
    public function index()
    {
        $rezervacije = Rezervacija::all();
        return RezervacijaResource::collection($rezervacije);
    }

    public function show($id)
    {
        try {
            $rezervacija = Rezervacija::findOrFail($id);
            return new RezervacijaResource($rezervacija);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Rezervacija not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|exists:users,id',
            'usluga_id' => 'required|exists:uslugas,id',
            'datum' => 'required|date',
            'vreme' => 'required',
            'zaposleni_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $rezervacija = Rezervacija::create($request->all());

        return new RezervacijaResource($rezervacija);
    }

    public function update(Request $request, $id)
    {
        try {
            $rezervacija = Rezervacija::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'korisnik_id' => 'exists:users,id',
                'usluga_id' => 'exists:uslugas,id',
                'datum' => 'date',
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

    public function destroy($id)
    {
        try {
            $rezervacija = Rezervacija::findOrFail($id);
            $rezervacija->delete();
            return response()->json(['message' => 'Rezervacija deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Rezervacija not found'], 404);
        }
    }
}
