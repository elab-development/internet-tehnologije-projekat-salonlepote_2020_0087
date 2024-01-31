<?php

namespace App\Http\Controllers;

use App\Models\Ocena;
use Illuminate\Http\Request;
use App\Http\Resources\OcenaResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OcenaController extends Controller
{
    public function index()
    {
        $ocene = Ocena::all();
        return OcenaResource::collection($ocene);
    }

    public function show($id)
    {
        try {
            $ocena = Ocena::findOrFail($id);
            return new OcenaResource($ocena);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ocena not found'], 404);
        }
    }

    public function store(Request $request)
    {
        // Uzmi ulogovanog korisnika
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'usluga_id' => 'required|exists:uslugas,id',
            'ocena' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Postavi korisnika na ulogovanog korisnika
        $request->merge(['korisnik_id' => $user->id]);

        $ocena = Ocena::create($request->all());

        return new OcenaResource($ocena);
    }

    public function update(Request $request, $id)
    {
        try {
            // Uzmi ulogovanog korisnika
            $user = $request->user();

            $ocena = Ocena::findOrFail($id);

            // Proveri da li je ulogovani korisnik ostavio ovu ocenu
            if ($ocena->korisnik_id !== $user->id) {
                return response()->json(['error' => 'Nemate pristup ovoj oceni'], 403);
            }

            $validator = Validator::make($request->all(), [
                'usluga_id' => 'exists:uslugas,id',
                'ocena' => 'integer|min:1|max:5',
                'komentar' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $ocena->update($request->all());

            return new OcenaResource($ocena);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ocena not found'], 404);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            // Uzmi ulogovanog korisnika
            $user = $request->user();

            $ocena = Ocena::findOrFail($id);

            // Proveri da li je ulogovani korisnik ostavio ovu ocenu
            if ($ocena->korisnik_id !== $user->id) {
                return response()->json(['error' => 'Nemate pristup ovoj oceni'], 403);
            }

            $ocena->delete();
            return response()->json(['message' => 'Ocena deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ocena not found'], 404);
        }
    }
}
