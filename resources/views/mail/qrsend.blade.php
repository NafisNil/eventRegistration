<x-mail::message>
# Registration confirmed

Hello {{ $name }},

Your registration has been submitted successfully.

## Your unique code
{{ $uniqueCode }}

<a href="{{ $qrUrl }}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; margin: 20px 0;">View QR code</a>

Please keep this code safe. The QR code contains your name and registration code.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
