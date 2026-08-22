<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ContactUs;
use App\Models\UserRegistration;

class AdminController extends Controller
{
    //
    public function index()
    {
        $userRegistrations = UserRegistration::orderBy('created_at', 'desc')->count();
        return Inertia::render('Admin/Dashboard', [
            'userRegistrations' => $userRegistrations,
        ]);
    }

    public function contactMessages()
    {
        $contactMessages = ContactUs::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/ContactMessages/Index', [
            'contactMessages' => $contactMessages,
        ]);
    }

}
