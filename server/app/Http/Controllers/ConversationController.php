<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    // Update a conversation
    public function updateConversation(Request $request, $id)
    {
        $request->validate([
            'name' => 'string',
            'user_ids' => 'array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $conversation = Conversation::findOrFail($id);
        $conversation->update($request->all());

        return response()->json($conversation);
    }

    // Retrieve a specific conversation
    public function getConversation($id)
    {
        $conversation = Conversation::with('messages')->findOrFail($id);
        return response()->json($conversation);
    }

    // Add a message to a conversation
    public function addMessageToConversation(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $conversation = Conversation::findOrFail($id);
        $conversation->messages()->create([
            'content' => $request->message,
            'user_id' => $request->user()->id,
        ]);

        return response()->json(['message' => 'Message added successfully'], 201);
    }
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
