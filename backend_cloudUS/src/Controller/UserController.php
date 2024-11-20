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


        $data = json_decode($request->getContent(), true);

            if ($data === null) {
                return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
            }

            // Accéder aux données du JSON
            $stockage = $data['stockage'];

        $mail = $this->userRepository->decodeToken($request);
        $user = $this->userRepository->findOneBy(['email'=> $mail]);

        // Ajouter 20 Go d'espace (20 480 Ko)
        $additionalStorage = 20480;
        $additionalStorage = ($additionalStorage * $stockage)/20;

        $user->setTotalStorage($user->getTotalStorage() + $additionalStorage);

    // Sauvegarder la mise à jour de l'utilisateur
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $invoiceData = [
            'invoice_number' => uniqid(),
            'date' => (new \DateTime())->format('Y-m-d'),
            'client_name' => $user->getNom() . ' ' . $user->getPrenom(),
            'client_address' => $user->getAdresse(),
            'total_amount' => $stockage,
            // Détails de l'achat
        'description' => 'Achat d\'espace de stockage supplémentaire',
        'unit_price' => $stockage,    // Prix unitaire hors taxe
        'quantity' => 1,          // Quantité achetée

        // Montants calculés
        'total_ht' => 20.00,      // Total hors taxe
        'tva_rate' => 0.20,       // Taux de TVA (20%)
        'tva_amount' => 20.00 * 0.20,  // Montant de la TVA
        'total_ttc' => 20.00 * 1.20    // Montant total toutes taxes comprises

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

#[Route('/api/user/delete-account', name: 'delete_acccount', methods: ['POST'])]
public function deleteUser(Request $request): JsonResponse
{

    $mail = $this->userRepository->decodeToken($request);
    $user = $this->userRepository->findOneBy(['email'=> $mail]);


    $tempmail = $mail;
    $tempnom = $user->getNom();
    $tempprenom = $user->getPrenom();
    // Mark the entity for deletion
    $this->entityManager->remove($user);

    // Persist the changes to the database
    $this->entityManager->flush();

    $this->emailService->senddeleteaccountNotification($tempmail, $tempnom, $tempprenom);

    return new JsonResponse([
        "message" => "Compte supprimé avec succes"
    ]);
    
}



}
