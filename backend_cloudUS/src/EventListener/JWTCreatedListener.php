<?php
namespace App\EventListener;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;


class JWTCreatedListener
{

    /**
 * @var RequestStack
 */
private $requestStack;

private $userRepository;

/**
 * @param RequestStack $requestStack
 */
public function __construct(RequestStack $requestStack,UserRepository $userRepository)
{
    $this->requestStack = $requestStack;
    $this->userRepository = $userRepository;
}

/**
 * @param JWTCreatedEvent $event
 *
 * @return void
 */
public function onJWTCreated(JWTCreatedEvent $event)
{
    $request = $this->requestStack->getCurrentRequest();

    $payload       = $event->getData();
    $payload['ip'] = $request->getClientIp();

    $event->setData($payload);

    $header        = $event->getHeader();
    $header['cty'] = 'JWT';

    $user = $this->userRepository->findByUsername($payload['username']);

    $payload['nom'] = $user->getNom();
    $payload['prenom'] = $user->getPrenom();
    $payload['adresse'] = $user->getAdresse();
    $payload['date_inscription'] = $user->getCreateAt();

    $event->setData($payload);

    $event->setHeader($header);
}



}

