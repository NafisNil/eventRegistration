<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\EventStatController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProgramHighlightController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\PartnershipCategoryController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\UserRegistrationController;
use App\Http\Controllers\ParticipantTypeController;

// Route::inertia('/', 'welcome')->name('home');

Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/about_us', [FrontendController::class, 'about'])->name('about.us');
Route::get('/guests_list', [FrontendController::class, 'guests'])->name('guests.list');

Route::get('/schedule_list', [FrontendController::class, 'schedule'])->name('schedule.list');

Route::get('/announcements_list', [FrontendController::class, 'announcements'])->name('announcements.list');

Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');

Route::get('/contact_us', [FrontendController::class, 'contact'])->name('contact_us');

Route::post('/contact_message', [FrontendController::class, 'contactMessage'])->name('contact.message');

Route::get('/user_register', [FrontendController::class, 'register'])->name('user.register');
Route::post('/user_register', [FrontendController::class, 'storeUserRegistration'])->name('user.register.store');
Route::get('/registration-qr/{registration}', [FrontendController::class, 'showQrCode'])->name('registration.qr');

Route::middleware(['auth', 'verified'])->group(function () {
   // Route::inertia('dashboard', 'dashboard')->name('dashboard');
   Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
   Route::resource('heroes', HeroController::class)->except(['show']);
   Route::resource('event-stats', EventStatController::class)->except(['show']);
   Route::resource('about', AboutController::class)->except(['show']);
   Route::resource('guests', GuestController::class);
   Route::resource('program-highlights', ProgramHighlightController::class);
   Route::resource('schedules', ScheduleController::class);
   Route::resource('partnership-categories', PartnershipCategoryController::class);
   Route::resource('partners', PartnerController::class);
   Route::resource('announcements', AnnouncementController::class);
   Route::resource('locations', LocationController::class);
   Route::resource('social-media', SocialMediaController::class);
   Route::get('contact-messages', [AdminController::class, 'contactMessages'])->name('contact.messages');
   Route::resource('user-registrations', UserRegistrationController::class)->only(['index', 'show']);
   Route::resource('participant-types', ParticipantTypeController::class)->except(['show']);
});

require __DIR__.'/settings.php';
