<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Send a message
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        $message = Message::create($request->all());

        return response()->json($message, 201);
    }

    // Retrieve messages for a specific user or group
    public function getMessages(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        $messages = Message::where('receiver_id', $request->user_id)
            ->orWhere('sender_id', $request->user_id)
            ->when($request->group_id, function ($query) use ($request) {
                return $query->where('group_id', $request->group_id);
            })
            ->with(['sender', 'receiver', 'group'])
            ->get();

        return response()->json($messages);
    }

    // Delete a message
    public function deleteMessage($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return response()->json(null, 204);
    }
}
