<?php

namespace App\Mail;

use App\Models\Rezervacija;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RezervacijaConfirmation extends Mailable
{
    use Queueable, SerializesModels;
    public $rezervacija;
    public $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Rezervacija $rezervacija, User $user)
    {
        $this->rezervacija = $rezervacija;
        $this->user = $user;
    }
    public function build()
    {
        return $this->view('emails.confirmation');
    }
    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Rezervacija Confirmation',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.confirmation',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
