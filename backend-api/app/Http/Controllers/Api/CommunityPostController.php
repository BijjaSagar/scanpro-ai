<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CommunityPost;
use App\Models\Screener;
use Illuminate\Http\Request;

class CommunityPostController extends Controller
{
    public function index()
    {
        // Get trending posts with user and screener data
        $posts = CommunityPost::with(['user', 'screener'])
            ->latest()
            ->paginate(15);
            
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'screener_id' => 'required|exists:screeners,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'tags' => 'nullable|array'
        ]);

        $post = $request->user()->communityPosts()->create($validated);

        return response()->json($post, 201);
    }

    public function cloneScreener(Screener $screener, Request $request)
    {
        // Clone the logic of a shared screener to the current user's account
        $newScreener = $request->user()->screeners()->create([
            'name' => $screener->name . ' (Clone)',
            'description' => "Cloned from community: " . $screener->description,
            'rules_json' => $screener->rules_json,
            'formula' => $screener->formula,
            'is_public' => false
        ]);

        return response()->json([
            'message' => 'Screener cloned successfully!',
            'screener' => $newScreener
        ]);
    }

    public function like(CommunityPost $post)
    {
        $post->increment('likes_count');
        return response()->json(['likes' => $post->likes_count]);
    }
}
