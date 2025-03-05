<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeControoler extends Controller
{
    public function home()
    {
        return inertia('Home');
    }
}
