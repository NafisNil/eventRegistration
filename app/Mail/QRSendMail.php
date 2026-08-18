<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QRSendMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $name;
    public string $uniqueCode;
    public string $qrUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(string $name, string $uniqueCode, string $qrUrl)
    {
        $this->name = $name;
        $this->uniqueCode = $uniqueCode;
        $this->qrUrl = $qrUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your event registration code',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.qrsend',
            with: [
                'name' => $this->name,
                'uniqueCode' => $this->uniqueCode,
                'qrUrl' => $this->qrUrl,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
