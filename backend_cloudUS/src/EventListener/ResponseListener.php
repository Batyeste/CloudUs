<?php
namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Cookie;

class ResponseListener
{
    private $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    public function onKernelResponse(ResponseEvent $event)
    {
        if (!$event->isMainRequest()) {
            return;
        }

        $response = $event->getResponse();
        $session = $this->requestStack->getSession();

        // Ajouter des cookies à la réponse
        $response->headers->setCookie(new Cookie('nom', $session->get('nom', 'valeur_nom')));
        $response->headers->setCookie(new Cookie('prenom', $session->get('prenom', 'valeur_prenom')));
    }
}
