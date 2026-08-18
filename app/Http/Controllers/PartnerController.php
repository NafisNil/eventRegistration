<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use App\Models\PartnershipCategory;
class PartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $partners = Partner::with('partnershipCategory')->get();
        return Inertia::render('Admin/Partner/Index', [
            'partners' => $partners,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $partnershipCategories = PartnershipCategory::all();
        return Inertia::render('Admin/Partner/Create', [
            'partnershipCategories' => $partnershipCategories,
        ]);

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
        $fileName = 'partners/'.Str::uuid()->toString().'.'.$extension;

        Storage::disk('public')->makeDirectory('partners');

        $image = $this->imageManager()->decodePath($file->getRealPath());
        $image->resize(64, 64);

        $image->scaleDown(1400)->save(Storage::disk('public')->path($fileName));

        return $fileName;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',

            'logo' => 'nullable|image|max:2048', // Max size 2MB
            'partnership_category_id' => 'nullable|exists:partnership_categories,id',
        ]);
        $partner = Partner::create([
            'name' => $validated['name'],
            'logo' => $this->uploadLogo($request),
            'partnership_category_id' => $validated['partnership_category_id'] ?? null,
        ]);
        return redirect()->route('partners.index')->with('success', 'Partner created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Partner $partner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Partner $partner)
    {
        //
        $partnershipCategories = PartnershipCategory::all();
        return Inertia::render('Admin/Partner/Edit', [
            'partner' => $partner,
            'partnershipCategories' => $partnershipCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048', // Max size 2MB
            'partnership_category_id' => 'nullable|exists:partnership_categories,id',
        ]);
        $partner->update([
            'name' => $validated['name'],
            'partnership_category_id' => $validated['partnership_category_id'] ?? null,
        ]);
        if ($request->hasFile('logo')) {
            $this->deleteImage($partner->logo);
            $partner->update([
                'logo' => $this->uploadLogo($request),
            ]);
        }
        return redirect()->route('partners.index')->with('success', 'Partner updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partner $partner)
    {
        //
        $this->deleteImage($partner->logo);
        $partner->delete();
        return redirect()->route('partners.index')->with('success', 'Partner deleted successfully.');
    }
}
