<?php

namespace Kunafa\StarterKit\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'user' => auth()->user(),
        ]);
    }
}
