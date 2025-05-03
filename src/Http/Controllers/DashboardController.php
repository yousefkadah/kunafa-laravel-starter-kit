<?php

namespace Kunafa\StarterKit\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        return view('kunafa::dashboard');
    }
}
