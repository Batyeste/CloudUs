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


    public function senddeleteaccountNotification(string $userEmail ,string $nom , string $prenom): void
    {
        $email = (new Email())
            ->from($this->mailProjet)
            ->to($userEmail)
            ->subject('Confirmation de la suppression de votre compte')
            ->text("Bonjour $nom $prenom,

Nous vous confirmons que votre compte associé à l'adresse e-mail $userEmail a été supprimé avec succès.

Toutes vos données personnelles et informations liées à ce compte ont été supprimées de nos systèmes, conformément à notre politique de confidentialité.

Si vous avez des questions ou besoin d'assistance supplémentaire, n'hésitez pas à nous contacter à [adresse e-mail de support].

Merci de nous avoir fait confiance.

Cordialement,
CloudUs");
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
