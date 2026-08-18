<?php

use App\Mail\QRSendMail;
use App\Models\UserRegistration;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

test('it generates a unique code and sends a qr email after registration', function () {
    Mail::fake();
    Storage::fake('public');

    $response = $this->post(route('user.register.store'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '01700000000',
        'gender' => 'female',
        'organization' => 'EventHub',
        'designation' => 'Developer',
        'district' => 'Dhaka',
        'address' => 'Dhaka, Bangladesh',
        'other_info' => 'Looking forward to attending.',
        'logo' => UploadedFile::fake()->image('profile.jpg', 600, 600),
    ]);

    $response->assertRedirect();

    $registration = UserRegistration::first();

    expect($registration)->not->toBeNull()
        ->and($registration->logo)->not->toBeNull()
        ->and(Storage::disk('public')->exists($registration->logo))->toBeTrue()
        ->and($registration->unique_code)->not->toBeNull()
        ->and($registration->unique_code)->toMatch('/^\d+$/')
        ->and($registration->unique_code)->toContain((string) $registration->id);

    Mail::assertSent(QRSendMail::class, function (QRSendMail $mail) use ($registration) {
        return $mail->hasTo($registration->email)
            && $mail->name === $registration->name
            && $mail->uniqueCode === $registration->unique_code
            && ! empty($mail->qrUrl)
            && str_contains($mail->qrUrl, route('registration.qr', ['registration' => $registration->id]));
    });
});
