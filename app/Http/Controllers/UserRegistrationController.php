<?php

namespace App\Http\Controllers;

use App\Models\UserRegistration;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class UserRegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $registrations = UserRegistration::all();
        return Inertia::render('Admin/UserRegistration/Index', [
            'registrations' => $registrations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserRegistration $userRegistration)
    {
        $registration = UserRegistration::with('participantType')->findOrFail($userRegistration->id);

        return Inertia::render('Admin/UserRegistration/Show', [
            'registration' => $registration,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserRegistration $userRegistration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserRegistration $userRegistration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserRegistration $userRegistration)
    {
        //
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
        $fileName = 'user-registrations/'.Str::uuid()->toString().'.'.$extension;

        Storage::disk('public')->makeDirectory('user-registrations');

        $image = $this->imageManager()->read($file->getRealPath());
        $image->scaleDown(1400);
        $image->save(Storage::disk('public')->path($fileName));

        return $fileName;
    }
}
