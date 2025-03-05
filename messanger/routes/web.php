<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\HomeControoler;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConversationController;

Route::middleware(['auth','verified'])->group(function(){
    Route::get('/',[HomeControoler::class, 'home'])->name('dashboard');

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

    Route::post('/messages/send', [MessageController::class, 'sendMessage']);
    Route::get('/messages', [MessageController::class, 'getMessages']);
    Route::delete('/messages/{id}', [MessageController::class, 'deleteMessage']);


    Route::post('/conversations', [ConversationController::class, 'createConversation']);
    Route::get('/conversations', [ConversationController::class, 'getConversations']);
    Route::delete('/conversations/{id}', [ConversationController::class, 'deleteConversation']);

require __DIR__.'/auth.php';
