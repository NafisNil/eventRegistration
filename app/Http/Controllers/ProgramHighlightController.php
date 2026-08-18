<?php

namespace App\Http\Controllers;

use App\Models\ProgramHighlight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProgramHighlightController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $programHighlights = ProgramHighlight::all();
        return Inertia::render('Admin/ProgramHighlight/Index', [
            'programHighlights' => $programHighlights,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/ProgramHighlight/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        ProgramHighlight::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'logo' => $this->uploadLogo($request),
        ]);

        return redirect()->route('program-highlights.index')->with('success', 'Program highlight created successfully.');
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
        $fileName = 'heroes/'.Str::uuid()->toString().'.'.$extension;

        Storage::disk('public')->makeDirectory('heroes');

        $image = $this->imageManager()->decodePath($file->getRealPath());
        $image->resize(20, 20);
        
        $image->scaleDown(1400)->save(Storage::disk('public')->path($fileName));

        return $fileName;
    }

    /**
     * Display the specified resource.
     */
    public function show(ProgramHighlight $programHighlight)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProgramHighlight $programHighlight)
    {
        return Inertia::render('Admin/ProgramHighlight/Edit', [
            'programHighlight' => $programHighlight,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProgramHighlight $programHighlight)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('logo')) {
            $this->deleteImage($programHighlight->logo);
            $validated['logo'] = $this->uploadLogo($request);
        }

        $programHighlight->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'logo' => $validated['logo'] ?? $programHighlight->logo,
        ]);

        return redirect()->route('program-highlights.index')->with('success', 'Program highlight updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgramHighlight $programHighlight)
    {
        $this->deleteImage($programHighlight->logo);

        $programHighlight->delete();

        return redirect()->route('program-highlights.index')->with('success', 'Program highlight deleted successfully.');
    }
}
