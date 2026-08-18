<?php

namespace App\Http\Controllers;

use App\Models\PartnershipCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
class PartnershipCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $partnershipCategories = PartnershipCategory::all();
        return Inertia::render('Admin/PartnershipCategory/Index', [
            'partnershipCategories' => $partnershipCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/PartnershipCategory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255',

        ]);
        PartnershipCategory::create($request->only(['name', 'description']));
        return redirect()->route('partnership-categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(PartnershipCategory $partnershipCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PartnershipCategory $partnershipCategory)
    {
        //
        return Inertia::render('Admin/PartnershipCategory/Edit', [
            'partnershipCategory' => $partnershipCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PartnershipCategory $partnershipCategory)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $partnershipCategory->update($request->only(['name', 'description']));
        return redirect()->route('partnership-categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PartnershipCategory $partnershipCategory)
    {
        //
        $partnershipCategory->delete();
        return redirect()->route('partnership-categories.index');
    }
}
