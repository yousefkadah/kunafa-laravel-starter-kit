<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Dashboard Routes
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    // Main Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Forms
    Route::get('/forms/object-forms', [DashboardController::class, 'objectForms'])->name('dashboard.forms.object');
    Route::get('/forms/inline-forms', [DashboardController::class, 'inlineForms'])->name('dashboard.forms.inline');
    Route::get('/forms/tabs-forms', [DashboardController::class, 'tabsForms'])->name('dashboard.forms.tabs');
    Route::get('/forms/steps-forms', [DashboardController::class, 'stepsForms'])->name('dashboard.forms.steps');
    
    // Datatables
    Route::get('/datatables/basic-datatables', [DashboardController::class, 'basicDatatables'])->name('dashboard.datatables.basic');
    Route::get('/datatables/sortable-datatables', [DashboardController::class, 'sortableDatatables'])->name('dashboard.datatables.sortable');
    Route::get('/datatables/searchable-datatables', [DashboardController::class, 'searchableDatatables'])->name('dashboard.datatables.searchable');
    Route::get('/datatables/serverside-datatables', [DashboardController::class, 'serversideDatatables'])->name('dashboard.datatables.serverside');
    
    // Charts
    Route::get('/charts/bar-charts', [DashboardController::class, 'barCharts'])->name('dashboard.charts.bar');
    Route::get('/charts/bubble-charts', [DashboardController::class, 'bubbleCharts'])->name('dashboard.charts.bubble');
    Route::get('/charts/doughnut-charts', [DashboardController::class, 'doughnutCharts'])->name('dashboard.charts.doughnut');
    Route::get('/charts/line-charts', [DashboardController::class, 'lineCharts'])->name('dashboard.charts.line');
    Route::get('/charts/pie-charts', [DashboardController::class, 'pieCharts'])->name('dashboard.charts.pie');
    Route::get('/charts/polar-area-charts', [DashboardController::class, 'polarAreaCharts'])->name('dashboard.charts.polarArea');
    Route::get('/charts/radar-charts', [DashboardController::class, 'radarCharts'])->name('dashboard.charts.radar');
    Route::get('/charts/scatter-charts', [DashboardController::class, 'scatterCharts'])->name('dashboard.charts.scatter');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
