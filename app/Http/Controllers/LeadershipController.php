<?php

namespace App\Http\Controllers;

use App\Models\Leadership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class LeadershipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $leaderships = Leadership::latest()->get();

        return Inertia::render('Admin/Leadership/Index', [
            'leaderships' => $leaderships,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Leadership/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'ministry' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        Leadership::create([
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'ministry' => $validated['ministry'] ?? null,
            'logo' => $this->uploadLogo($request),
        ]);

        return redirect()->route('leaderships.index')->with('success', 'Leadership created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Leadership $leadership)
    {
        return Inertia::render('Admin/Leadership/Show', [
            'leadership' => $leadership,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Leadership $leadership)
    {
        return Inertia::render('Admin/Leadership/Edit', [
            'leadership' => $leadership,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Leadership $leadership)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'ministry' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $leadership->update([
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'ministry' => $validated['ministry'] ?? null,
            'logo' => $this->uploadLogo($request) ?? $leadership->logo,
        ]);

        return redirect()->route('leaderships.index')->with('success', 'Leadership updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leadership $leadership)
    {
        $this->deleteImage($leadership->logo);
        $leadership->delete();

        return redirect()->route('leaderships.index')->with('success', 'Leadership deleted successfully.');
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
        $fileName = 'leadership/'.Str::uuid()->toString().'.'.$extension;

        Storage::disk('public')->makeDirectory('leadership');

        $image = $this->imageManager()->decodePath($file->getRealPath());
        $image->resize(360, 450);
        $image->scaleDown(1400)->save(Storage::disk('public')->path($fileName));

        return $fileName;
    }
}
