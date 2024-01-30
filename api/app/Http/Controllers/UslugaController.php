<?php

namespace App\Http\Controllers;

use App\Models\Usluga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UslugaResource;

class UslugaController extends Controller
{
    public function index()
    {
        $usluge = Usluga::all();

        return UslugaResource::collection($usluge);
    }

    public function show($id)
    {
        $usluga = Usluga::findOrFail($id);

        return new UslugaResource($usluga);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string',
            'opis' => 'string|nullable',
            'cena' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $usluga = Usluga::create([
            'naziv' => $request->input('naziv'),
            'opis' => $request->input('opis'),
            'cena' => $request->input('cena'),
        ]);

        return new UslugaResource($usluga);
    }

    public function update(Request $request, $id)
    {
        $usluga = Usluga::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'string',
            'opis' => 'string|nullable',
            'cena' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $usluga->update($request->only(['naziv', 'opis', 'cena']));

        return new UslugaResource($usluga);
    }

    public function destroy($id)
    {
        $usluga = Usluga::findOrFail($id);

        $usluga->delete();

        return response()->json(['message' => 'Usluga deleted successfully'], 200);
    }
}
