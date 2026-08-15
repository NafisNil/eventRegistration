<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HeroController;
Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
   // Route::inertia('dashboard', 'dashboard')->name('dashboard');
   Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
   Route::resource('heroes', HeroController::class)->except(['show']);
});

require __DIR__.'/settings.php';
