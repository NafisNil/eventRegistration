<?php

namespace App\Http\Controllers;

use App\Models\EventStat;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
class EventStatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $eventStats = EventStat::orderBy('created_at', 'desc')->limit(1)->get();
        return Inertia::render('Admin/EventStat/Index', [
            'eventStats' => $eventStats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/EventStat/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'event_name' => 'required|string',
            'location' => 'required|string',
            'event_date' => 'required|date',
            'time' => 'required|string',
            'registration_deadline' => 'required|date',
            
        ]);

        $eventStat = EventStat::create($request->all());
        return redirect()->route('event-stats.index')->with('success', 'Event Stat created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(EventStat $eventStat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EventStat $eventStat)
    {
        return Inertia::render('Admin/EventStat/Edit', [
            'eventStat' => $eventStat,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EventStat $eventStat)
    {
        //
        $request->validate([
            'event_name' => 'required|string',
            'location' => 'required|string',
            'event_date' => 'required|date',
            'time' => 'required|string',
            'registration_deadline' => 'required|date',
        ]);
        $eventStat->update($request->all());
        return redirect()->route('event-stats.index')->with('success', 'Event Stat updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventStat $eventStat)
    {
        $eventStat->delete();
        return redirect()->route('event-stats.index')->with('success', 'Event Stat deleted successfully.');
    }
}
