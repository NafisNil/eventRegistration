<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Hero/Index', [
            'heroes' => Hero::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Hero/Create');
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
        
        $image->scaleDown(1400)->save(Storage::disk('public')->path($fileName));

        return $fileName;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => ['required', 'string', 'max:1000'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $hero = Hero::create([
            'description' => $validated['description'],
            'logo' => $this->uploadLogo($request),
        ]);

        return redirect()->back()->with('success', 'Hero created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Hero $hero)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hero $hero)
    {
        return Inertia::render('Admin/Hero/Edit', [
            'hero' => $hero,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hero $hero)
    {
        $validated = $request->validate([
            'description' => ['required', 'string', 'max:1000'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('logo')) {
            $this->deleteImage($hero->logo);
            $validated['logo'] = $this->uploadLogo($request);
        }

        $hero->update([
            'description' => $validated['description'],
            'logo' => $validated['logo'] ?? $hero->logo,
        ]);

        return redirect()->back()->with('success', 'Hero updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hero $hero)
    {
        $this->deleteImage($hero->logo);

        $hero->delete();

        return redirect()->back()->with('success', 'Hero deleted successfully.');
    }
}
