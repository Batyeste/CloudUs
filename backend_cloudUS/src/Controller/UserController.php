<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\EmailService;
use App\Service\InvoiceService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{

    private $userRepository;

    private $entityManager;

    private $emailService;

    public function __construct(UserRepository $userRepository, EntityManagerInterface $entityManagerInterface,EmailService $emailService){
        $this->userRepository = $userRepository;
        $this->emailService = $emailService;
        $this->entityManager = $entityManagerInterface;
    }
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    #[Route('/api/user/buy-storage', name: 'buy_storage', methods: ['POST'])]
public function buyStorage(Request $request): JsonResponse
{
    $user = $this->getUser();

    $user = $this->userRepository->findOneBy(["email"=>$user->getUserIdentifier()]);

    // Ajouter 20 Go d'espace (20 480 Ko)
    $additionalStorage = 20480;
    $user->setTotalStorage($user->getTotalStorage() + $additionalStorage);

   // Sauvegarder la mise à jour de l'utilisateur
    $this->entityManager->persist($user);
    $this->entityManager->flush();

    $invoiceData = [
        'invoice_number' => uniqid(),
        'date' => (new \DateTime())->format('Y-m-d'),
        'client_name' => $user->getNom() . ' ' . $user->getPrenom(),
        'client_address' => $user->getAdresse(),
        'total_amount' => 20.00,
    ];
    
    $invoiceService = new InvoiceService();
    $pdfPath = $invoiceService->generateInvoicePdf($invoiceData);
    
    $this->emailService->sendStoragePurchaseNotification($user->getEmail(), $additionalStorage, $pdfPath);

    return new JsonResponse([
        'status' => 'Espace supplémentaire acheté',
        'totalStorage' => $user->getTotalStorage(),
        'usedStorage' => $user->getUserStorage(),
        'remainingStorage' => $user->getTotalStorage() - $user->getUserStorage()
    ]);
}



}
