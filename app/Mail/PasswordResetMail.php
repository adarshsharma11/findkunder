<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $resetLink;
    public $expirationTime;
    public $supportEmail;
    public $user;

    /**
     * Create a new message instance.
     *
     * @param string $resetLink
     * @param string $expirationTime
     * @param string $supportEmail
     *  @param string $user
     */
    public function __construct($resetLink, $expirationTime, $supportEmail, $user)
    {
        $this->resetLink = $resetLink;
        $this->expirationTime = $expirationTime;
        $this->supportEmail = $supportEmail;
        $this->$user = $user;
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Password Reset Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $content = new Content(
            view: 'emails.password_reset'
        );
        return $content->with([
            'user' => $this->user,
            'resetLink' => $this->resetLink,
            'expirationTime' => $this->expirationTime,
            'supportEmail' => $this->supportEmail,
        ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
