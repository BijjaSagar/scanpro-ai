<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Screener;
use Illuminate\Http\Request;

class ScreenerController extends Controller
{
    public function index(Request $request)
    {
        $screeners = $request->user()->screeners()->latest()->get();
        return response()->json($screeners);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'rules_json' => 'required|array',
            'formula' => 'nullable|string',
            'is_public' => 'boolean',
        ]);

        $screener = $request->user()->screeners()->create($validated);

        return response()->json($screener, 201);
    }

    public function show(Screener $screener)
    {
        $this->authorize('view', $screener);
        return response()->json($screener);
    }

    public function update(Request $request, Screener $screener)
    {
        $this->authorize('update', $screener);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'rules_json' => 'sometimes|required|array',
            'formula' => 'nullable|string',
            'is_public' => 'boolean',
        ]);

        $screener->update($validated);

        return response()->json($screener);
    }

    public function destroy(Screener $screener)
    {
        $this->authorize('delete', $screener);
        $screener->delete();

        return response()->json(null, 204);
    }

    public function publicScans()
    {
        $screeners = Screener::where('is_public', true)->latest()->paginate(20);
        return response()->json($screeners);
    }
}
