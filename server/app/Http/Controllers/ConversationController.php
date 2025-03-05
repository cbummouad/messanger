<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    // Create a new conversation
    public function createConversation(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $conversation = Conversation::create($request->all());

        return response()->json($conversation, 201);
    }

    // Retrieve all conversations for a specific user
    public function getConversations(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $conversations = Conversation::where('user_id', $request->user_id)
            ->with('messages')
            ->get();

        return response()->json($conversations);
    }

    // Delete a conversation
    public function deleteConversation($id)
    {
        $conversation = Conversation::findOrFail($id);
        $conversation->delete();

        return response()->json(null, 204);
    }
}
