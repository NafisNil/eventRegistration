<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\EventStat;
use App\Models\Announcement;
use App\Models\Guest;
use App\Models\Hero;
use App\Models\Leadership;
use App\Models\Location;
use App\Models\Partner;
use App\Models\ProgramHighlight;
use App\Models\Schedule;
use App\Models\SocialMedia;
use App\Mail\QRSendMail;
use App\Models\ContactUs;
use Illuminate\Http\Request;
use App\Models\UserRegistration;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\ParticipantType;
use Manoar\QrCode\Facades\QrCode;

use Inertia\Inertia;

class FrontendController extends Controller
{
    private const USER_REGISTRATION_AUTH_SESSION_KEY = 'user_registration_authenticated';

    public function index()
    {
        return Inertia::render('Index', [
            'hero' => Hero::latest()->first(),
            'eventStat' => EventStat::latest()->first(),
            'about' => About::latest()->first(),
            'guests' => Guest::latest()->get(),
            'programHighlights' => ProgramHighlight::latest()->get(),
            'schedules' => Schedule::latest()->get(),
            'partners' => Partner::with('partnershipCategory')->latest()->get(),
            'leaderships' => Leadership::latest()->get(),
            'location' => Location::latest()->first(),
            'socialMedia' => SocialMedia::latest()->first(),
            'participantTypes' => ParticipantType::latest()->get(),
        ]);
    }

    public function about()
    {
        return Inertia::render('Frontend/About', [
            'about' => About::latest()->first(),
            'eventStat' => EventStat::latest()->first(),
            'partners' => Partner::with('partnershipCategory')->latest()->get(),
            'location' => Location::latest()->first(),
            'socialMedia' => SocialMedia::latest()->first(),
        ]);
    }


    public function guests()
    {
        return Inertia::render('Frontend/Guests', [
            'guests' => Guest::latest()->get(),
            'eventStat' => EventStat::latest()->first(),
            'about' => About::latest()->first(),
            'location' => Location::latest()->first(),
            'socialMedia' => SocialMedia::latest()->first(),
        ]);
    }

    public function schedule()
    {
        return Inertia::render('Frontend/Schedule', [
            'schedules' => Schedule::latest()->get(),
            'eventStat' => EventStat::latest()->first(),
            'about' => About::latest()->first(),
            'location' => Location::latest()->first(),
            'socialMedia' => SocialMedia::latest()->first(),
        ]);
    }   

    public function announcements()
    {
        return Inertia::render('Frontend/Announcements', [
            'announcements' => Announcement::latest()->get(),
            'eventStat' => EventStat::latest()->first(),
            'about' => About::latest()->first(),
            'location' => Location::latest()->first(),
            'socialMedia' => SocialMedia::latest()->first(),
            
        ]);
    }

    public function contact()
    {
        return Inertia::render('Frontend/Contact', [
            'location' => Location::latest()->first(),
            'eventStat' => EventStat::latest()->first(),
            'about' => About::latest()->first(),
            'socialMedia' => SocialMedia::latest()->first(),
        ]);
    }

    public function contactMessage(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'phone' => 'nullable|string|max:255',
        ]);

        ContactUs::create($validatedData);

        return redirect()->back()->with('success', 'Your message has been sent successfully.');
    }

    public function register()
    {
        return Inertia::render('Frontend/Register', [
            'eventStat' => EventStat::latest()->first(),
            'about' => About::latest()->first(),
            'location' => Location::latest()->first(),
            'socialMedia' => SocialMedia::latest()->first(),
            'participantTypes' => ParticipantType::latest()->get(),
        ]);
    }

    public function storeUserRegistration(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:user_registrations,email',
            'phone' => 'nullable|numeric|digits_between:8,15',
            'gender' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'other_info' => 'nullable|string',
            'unique_code' => 'nullable|string|max:255',
            'participation_type_id' => 'nullable|exists:participant_types,id',
        ]);

        $registrationData = $validatedData;

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $path = $file->storeAs('user-registrations', Str::uuid() . '.' . $file->getClientOriginalExtension(), 'public');
            $registrationData['logo'] = $path;
        }

        $registration = UserRegistration::create($registrationData);

        $registration->unique_code = random_int(100000, 999999) . $registration->id;
        $registration->save();

        $qrPayload = $registration->name . ' | ' . $registration->unique_code;
        $qrFilePath = 'qr-codes/' . $registration->id . '.png';
        $qrImage = QrCode::format('png')->size(500)->generate($qrPayload);
        Storage::disk('public')->put($qrFilePath, $qrImage);

        $qrUrl = route('registration.qr', ['registration' => $registration->id]);

        Mail::to($registration->email)->send(
            new QRSendMail($registration->name, $registration->unique_code, $qrUrl)
        );

        return redirect()->back()->with('success', 'Your registration has been submitted successfully.');
    }

    public function showQrCode(UserRegistration $registration)
    {
        $qrFilePath = 'qr-codes/' . $registration->id . '.png';

        if (! Storage::disk('public')->exists($qrFilePath)) {
            $qrPayload = $registration->name . ' | ' . $registration->unique_code;
            $qrImage = QrCode::format('png')->size(500)->generate($qrPayload);
            Storage::disk('public')->put($qrFilePath, $qrImage);
        }

        return response(Storage::disk('public')->get($qrFilePath), 200)
            ->header('Content-Type', 'image/png');
    }

    public function gatePass()
    {
        return Inertia::render('Frontend/GatePass');
    }

    public function gatePassCheck(Request $request)
    {
        $validated = $request->validate([
            // Either unique_code or phone must be provided
            'unique_code' => 'nullable|string|max:255',
        ]);

        $user = UserRegistration::with('participantType')
            ->where('unique_code', $validated['unique_code'])
            ->orWhere('phone', $validated['unique_code'])
            ->first();

        if (! $user) {
            return redirect()->back()->withErrors([
                'unique_code' => 'দুঃখিত! কোনো তথ্য পাওয়া যায়নি। সঠিক কোড দিন।',
            ]);
        }

        return Inertia::render('Frontend/GatePass', [
            'user' => $user,
        ]);
    }

    //show user registration details
    public function showUserRegistration(Request $request)
    {
        $isAuthenticated = (bool) $request->session()->get(self::USER_REGISTRATION_AUTH_SESSION_KEY, false);
        $eventStat = EventStat::latest()->first();

        if (! $isAuthenticated) {
            return Inertia::render('Frontend/UserRegistration', [
                'isAuthenticated' => false,
                'eventStat' => $eventStat,
            ]);
        }

        return Inertia::render('Frontend/UserRegistration', [
            'isAuthenticated' => true,
            'eventStat' => $eventStat,
            'registrations' => UserRegistration::with('participantType')->latest()->get(),
        ]);
    }

    public function userRegistrationLogin(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);

        $eventStat = EventStat::latest()->first();

        if (! $eventStat || blank($eventStat->username) || blank($eventStat->password)) {
            return redirect()->route('user.registration.show')->withErrors([
                'auth' => 'ইভেন্ট লগইন তথ্য সেট করা নেই। আগে অ্যাডমিন প্যানেল থেকে username/password সেট করুন।',
            ]);
        }

        $usernameMatches = hash_equals((string) $eventStat->username, (string) $validatedData['username']);
        $passwordMatches = $this->eventPasswordMatches((string) $validatedData['password'], (string) $eventStat->password);

        if (! $usernameMatches || ! $passwordMatches) {
            return redirect()->route('user.registration.show')
                ->withErrors(['auth' => 'ভুল username বা password। আবার চেষ্টা করুন।'])
                ->withInput($request->only('username'));
        }

        $request->session()->put(self::USER_REGISTRATION_AUTH_SESSION_KEY, true);

        return redirect()->route('user.registration.show');
    }

    public function userRegistrationLogout(Request $request)
    {
        $request->session()->forget(self::USER_REGISTRATION_AUTH_SESSION_KEY);

        return redirect()->route('user.registration.show');
    }

    private function eventPasswordMatches(string $inputPassword, string $storedPassword): bool
    {
        if ($inputPassword === '' || $storedPassword === '') {
            return false;
        }

        return hash_equals($storedPassword, $inputPassword) || Hash::check($inputPassword, $storedPassword);
    }
}
