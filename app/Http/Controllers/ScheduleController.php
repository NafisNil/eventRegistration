<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $schedules = Schedule::all();
        return Inertia::render('Admin/Schedule/Index', [
            'schedules' => $schedules,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Schedule/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            
            'time' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'keynote_speaker' => ['nullable', 'string', 'max:255'],
        ]);

        Schedule::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'time' => $validated['time'] ?? null,
            'badge' => $validated['badge'] ?? null,
            'location' => $validated['location'] ?? null,
            'keynote_speaker' => $validated['keynote_speaker'] ?? null,
        ]);

        return redirect()->route('schedules.index')->with('success', 'Schedule created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        //
        return Inertia::render('Admin/Schedule/Edit', [
            'schedule' => $schedule,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        //
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'time' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'keynote_speaker' => ['nullable', 'string', 'max:255'],
        ]);
        $schedule->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'time' => $validated['time'] ?? null,
            'badge' => $validated['badge'] ?? null,
            'location' => $validated['location'] ?? null,
            'keynote_speaker' => $validated['keynote_speaker'] ?? null,
        ]);
        return redirect()->route('schedules.index')->with('success', 'Schedule updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return redirect()->route('schedules.index')->with('success', 'Schedule deleted successfully.');
    }
}
