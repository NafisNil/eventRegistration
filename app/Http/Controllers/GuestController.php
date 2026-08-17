<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $guests = Guest::all();
        return Inertia::render('Admin/Guest/Index', [
            'guests' => $guests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Guest/Create');
    }

    protected function imageManager(): ImageManager
    {
        return new ImageManager(new Driver());
    }

    protected function deleteImage(?string $path): void
    {
        if (! blank($path) && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    protected function uploadLogo(Request $request): ?string
    {
        if (! $request->hasFile('logo')) {
            return null;
        }

        $file = $request->file('logo');
        $extension = $file->getClientOriginalExtension() ?: 'jpg';
        $fileName = 'guest/'.Str::uuid()->toString().'.'.$extension;

        Storage::disk('public')->makeDirectory('guest');

        $image = $this->imageManager()->decodePath($file->getRealPath());
        $image->resize(600, 900);
        $image->scaleDown(1400)->save(Storage::disk('public')->path($fileName));

        return $fileName;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',

            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $guest = Guest::create([
            'name' => $validatedData['name'],
            'designation' => $validatedData['designation'],
            'description' => $validatedData['description'] ?? null,
            'logo' => $this->uploadLogo($request),
            'expertise' => $request->input('expertise', null),
        ]);

        return redirect()->route('guests.index')->with('success', 'Guest created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        //
        return Inertia::render('Admin/Guest/Show', [
            'guest' => $guest,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guest $guest)
    {
        return Inertia::render('Admin/Guest/Edit', [
            'guest' => $guest,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guest $guest)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $guest->update([
            'name' => $validatedData['name'],
            'designation' => $validatedData['designation'],
            'description' => $validatedData['description'] ?? null,
            'logo' => $this->uploadLogo($request) ?? $guest->logo,
            'expertise' => $request->input('expertise', $guest->expertise),
        ]);

        return redirect()->route('guests.index')->with('success', 'Guest updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        //
        $guest->delete();
        return redirect()->route('guests.index')->with('success', 'Guest deleted successfully.');
    }
}
