<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Location::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Location/Index', [
            'locations' => $locations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Location/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:255',
            'map' => 'nullable|url|max:255',
        ]);

        $validatedData['map'] = $this->normalizeMapUrl($validatedData['map'] ?? null);

        Location::create($validatedData);

        return redirect()->route('locations.index')->with('success', 'Location created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        return Inertia::render('Admin/Location/Edit', [
            'location' => $location,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location): RedirectResponse
    {
        $validatedData = $request->validate([
            'email' => 'sometimes|required|string|email|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:255',
            'map' => 'nullable|url|max:255',
        ]);

        if (array_key_exists('map', $validatedData)) {
            $validatedData['map'] = $this->normalizeMapUrl($validatedData['map']);
        }

        $location->update($validatedData);

        return redirect()->route('locations.index')->with('success', 'Location updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $location->delete();

        return redirect()->route('locations.index')->with('success', 'Location deleted successfully.');
    }

    private function normalizeMapUrl(?string $map): ?string
    {
        if (blank($map)) {
            return null;
        }

        $normalizedMap = trim($map);

        if (str_contains($normalizedMap, 'maps.app.goo.gl') || str_contains($normalizedMap, 'goo.gl/maps')) {
            $resolvedUrl = $this->resolveGoogleMapUrl($normalizedMap);

            if ($resolvedUrl !== null) {
                $normalizedMap = $resolvedUrl;
            }
        }

        if (str_contains($normalizedMap, 'google.com/maps') || str_contains($normalizedMap, 'maps.google.com')) {
            $parsedUrl = parse_url($normalizedMap);
            $query = $parsedUrl['query'] ?? '';

            if ($query !== '') {
                parse_str($query, $queryParameters);

                if (! empty($queryParameters['q'])) {
                    return 'https://www.google.com/maps?q=' . urlencode(rawurldecode((string) $queryParameters['q'])) . '&output=embed';
                }
            }

            if (str_contains($normalizedMap, '/maps/embed') || str_contains($normalizedMap, 'output=embed')) {
                return $normalizedMap;
            }

            if (preg_match('/\/maps\/place\/[^?]+/i', $normalizedMap, $match) === 1) {
                $placeValue = str_replace('/maps/place/', '', $match[0]);

                return 'https://www.google.com/maps?q=' . urlencode(str_replace(['/', '+'], ' ', $placeValue)) . '&output=embed';
            }
        }

        return $normalizedMap;
    }

    private function resolveGoogleMapUrl(string $url): ?string
    {
        $ch = curl_init($url);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HEADER => true,
            CURLOPT_NOBODY => true,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_USERAGENT => 'Mozilla/5.0',
        ]);

        curl_exec($ch);

        $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);

        curl_close($ch);

        if (! is_string($finalUrl) || $finalUrl === '') {
            return null;
        }

        return $finalUrl;
    }
}
