<?php

namespace App\Http\Controllers;

use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
class SocialMediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $socialMedia = SocialMedia::all();
        return Inertia::render('Admin/Social/Index', [
            'socialMedia' => $socialMedia,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Social/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([

            'facebook' => 'required|url',
            'linkedin' => 'nullable|url',
            'youtube' => 'nullable|url',
            'twitter' => 'nullable|url',
        ]);

        SocialMedia::create($validatedData);
        return redirect()->route('social-media.index')->with('success', 'Social media links created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SocialMedia $social_medium)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SocialMedia $social_medium)
    {
        return Inertia::render('Admin/Social/Edit', [
            'socialMedia' => $social_medium,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SocialMedia $social_medium)
    {
        $validatedData = $request->validate([
            'facebook' => 'required|url',
            'linkedin' => 'nullable|url',
            'youtube' => 'nullable|url',
            'twitter' => 'nullable|url',
        ]);

        $social_medium->update($validatedData);

        return redirect()->route('social-media.index')->with('success', 'Social media links updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialMedia $social_medium)
    {
        $social_medium->delete();

        return redirect()->route('social-media.index')->with('success', 'Social media links deleted successfully.');
    }
}
