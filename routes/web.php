<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\EventStatController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProgramHighlightController;
Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
   // Route::inertia('dashboard', 'dashboard')->name('dashboard');
   Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
   Route::resource('heroes', HeroController::class)->except(['show']);
   Route::resource('event-stats', EventStatController::class)->except(['show']);
   Route::resource('about', AboutController::class)->except(['show']);
   Route::resource('guests', GuestController::class);
   Route::resource('program-highlights', ProgramHighlightController::class);
});

require __DIR__.'/settings.php';
