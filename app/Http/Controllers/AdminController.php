<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ContactUs;

class AdminController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function contactMessages()
    {
        $contactMessages = ContactUs::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/ContactMessages/Index', [
            'contactMessages' => $contactMessages,
        ]);
    }

}
