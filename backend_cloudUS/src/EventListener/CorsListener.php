<?php 

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\ResponseEvent;

class CorsListener
{
    public function onKernelResponse(ResponseEvent $event)
    {
        $response = $event->getResponse();
        $request = $event->getRequest();

        // Autoriser les requêtes CORS uniquement pour les routes de l'API
        if (strpos($request->getPathInfo(), '/api') === 0) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }

        // Autoriser les requêtes OPTIONS (pré-requêtes)
        if ($request->getMethod() === 'OPTIONS') {
            $response->setStatusCode(200);
            $event->setResponse($response);
        }
    }
}