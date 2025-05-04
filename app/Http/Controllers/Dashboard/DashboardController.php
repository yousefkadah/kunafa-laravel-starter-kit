<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Here you can fetch data from your database and pass it to the dashboard
        return Inertia::render('Dashboard/Index');
    }

    /**
     * Display the forms section.
     *
     * @return \Inertia\Response
     */
    public function objectForms()
    {
        return Inertia::render('Dashboard/Forms/ObjectForms');
    }

    public function inlineForms()
    {
        return Inertia::render('Dashboard/Forms/InlineForms');
    }

    public function tabsForms()
    {
        return Inertia::render('Dashboard/Forms/TabsForms');
    }

    public function stepsForms()
    {
        return Inertia::render('Dashboard/Forms/StepsForms');
    }

    /**
     * Display the datatables section.
     *
     * @return \Inertia\Response
     */
    public function basicDatatables()
    {
        return Inertia::render('Dashboard/Datatables/BasicDatatables');
    }

    public function sortableDatatables()
    {
        return Inertia::render('Dashboard/Datatables/SortableDatatables');
    }

    public function searchableDatatables()
    {
        return Inertia::render('Dashboard/Datatables/SearchableDatatables');
    }

    public function serversideDatatables()
    {
        // Here you could fetch data from your database
        $data = []; // Example data - you would replace this with real data
        
        return Inertia::render('Dashboard/Datatables/ServersideDatatables', [
            'serverData' => $data
        ]);
    }

    /**
     * Display the charts section.
     *
     * @return \Inertia\Response
     */
    public function barCharts()
    {
        return Inertia::render('Dashboard/Pages/BarChartsPage');
    }

    public function bubbleCharts()
    {
        return Inertia::render('Dashboard/Charts/BubbleCharts');
    }

    public function doughnutCharts()
    {
        return Inertia::render('Dashboard/Charts/DoughnutCharts');
    }

    public function lineCharts()
    {
        return Inertia::render('Dashboard/Pages/LineChartsPage');
    }

    public function pieCharts()
    {
        return Inertia::render('Dashboard/Charts/PieCharts');
    }

    public function polarAreaCharts()
    {
        return Inertia::render('Dashboard/Charts/PolarAreaCharts');
    }

    public function radarCharts()
    {
        return Inertia::render('Dashboard/Charts/RadarCharts');
    }

    public function scatterCharts()
    {
        return Inertia::render('Dashboard/Charts/ScatterCharts');
    }
}
