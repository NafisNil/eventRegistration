<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $about = About::orderBy('id', 'desc')->limit(1)->get();
        return Inertia::render('Admin/About/Index', [
            'about' => $about,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/About/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'description' => 'required|string',
            'reason_to_attend' => 'nullable|string',
            'objectives' => 'nullable|string',
            'eligibility' => 'nullable|string',
        ]);

        $about = About::create($request->all());
        return redirect()->route('about.index')->with('success', 'About created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(About $about)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(About $about)
    {
        //
        return Inertia::render('Admin/About/Edit', [
            'about' => $about,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, About $about)
    {
        //
        $request->validate([
            'description' => 'required|string',
            'reason_to_attend' => 'nullable|string',
            'objectives' => 'nullable|string',
            'eligibility' => 'nullable|string',
        ]);
        $about->update($request->all());
        return redirect()->route('about.index')->with('success', 'About updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(About $about)
    {
        
        $about->delete();
        return redirect()->route('about.index')->with('success', 'About deleted successfully.');
    }
}
