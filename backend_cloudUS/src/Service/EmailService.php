<?php
namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailService
{
    private $mailer;

    private $mailProjet;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
        $this->mailProjet = "yoharh56@gmail.com";
    }

    public function sendEmail(string $to, string $subject, string $content): void
    {
        $email = (new Email())
            ->from($this->mailProjet)
            ->to($to)
            ->subject($subject)
            ->text($content)
            ->html('<p>' . $content . '</p>');

        $this->mailer->send($email);
    }


    public function sendStoragePurchaseNotification(string $userEmail, int $additionalStorage,string $invoicePath): void
    {
        $email = (new Email())
            ->from($this->mailProjet)
            ->to($userEmail)
            ->subject('Confirmation de votre achat d\'espace de stockage')
            ->text("Vous avez acheté {$additionalStorage} Ko d'espace supplémentaire. Merci pour votre achat! Veuillez trouver ci-joint votre facture pour l\'achat de stockage supplémentaire.")
            ->attachFromPath($invoicePath, 'facture.pdf', 'application/pdf');
        $this->mailer->send($email);
    }

    public function sendFileDeletionNotification(string $userEmail, int $fileCount): void
    {
        $email = (new Email())
            ->from($this->mailProjet)
            ->to($userEmail)
            ->subject('Confirmation de suppression de fichier')
            ->text("Vous avez supprimé {$fileCount} fichiers de votre espace de stockage.");

        $this->mailer->send($email);
    }
}
