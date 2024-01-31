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
        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|exists:users,id',
            'usluga_id' => 'required|exists:uslugas,id',
            'ocena' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $ocena = Ocena::create($request->all());

        return new OcenaResource($ocena);
    }

    public function update(Request $request, $id)
    {
        try {
            $ocena = Ocena::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'korisnik_id' => 'exists:users,id',
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

    public function destroy($id)
    {
        try {
            $ocena = Ocena::findOrFail($id);
            $ocena->delete();
            return response()->json(['message' => 'Ocena deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ocena not found'], 404);
        }
    }
}
