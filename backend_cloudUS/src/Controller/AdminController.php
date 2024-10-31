<?php

namespace App\Controller;

use App\Repository\FileRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AdminController extends AbstractController
{

    private  $userRepository;
    private $fileRepository;
    public function __construct(UserRepository $userRepository, FileRepository $fileRepository){
        $this->userRepository = $userRepository;
        $this->fileRepository = $fileRepository;
    }
    #[Route('/admin', name: 'app_admin')]
    public function index(): Response
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }

    #[Route('/api/admin/dashboard', name: 'admin_dashboard', methods: ['GET'])]
    public function dashboard(UserRepository $userRepository, FileRepository $fileRepository): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        // Nombre total d'utilisateurs
        $totalUsers = $this->userRepository->count([]);

        // Nombre total de fichiers uploadés
        $totalFiles = $this->fileRepository->count([]);

        // Espace de stockage total utilisé
        $totalStorageUsed = $this->fileRepository->getTotalStorageUsed();

        // Nombre de fichiers uploadés aujourd'hui, cette semaine, et ce mois
        $filesUploadedToday = $this->fileRepository->countUploadedSince(new \DateTime('today'));
        $filesUploadedThisWeek = $this->fileRepository->countUploadedSince(new \DateTime('monday this week'));
        $filesUploadedThisMonth = $this->fileRepository->countUploadedSince(new \DateTime('first day of this month'));

        // Répartition des fichiers par format
        $filesByFormat = $this->fileRepository->countFilesByFormat();

        return new JsonResponse([
            'totalUsers' => $totalUsers,
            'totalFiles' => $totalFiles,
            'totalStorageUsed' => $totalStorageUsed,
            'filesUploadedToday' => $filesUploadedToday,
            'filesUploadedThisWeek' => $filesUploadedThisWeek,
            'filesUploadedThisMonth' => $filesUploadedThisMonth,
            'filesByFormat' => $filesByFormat,
        ]);
    
    }

    #[Route('/api/admin/files', name: 'list_all_files', methods: ['GET'])]
    public function listAllFiles(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $filesData = [];
        $files = $this->fileRepository->findAll();

        foreach ($files as $file) {
            $filesData[] = [
                'fileId' => $file->getId(),
                'fileName' => $file->getName(),
                'fileSize' => $file->getFileSize(),
                'uploadDate' => $file->getUploadDate()->format('Y-m-d H:i:s'),
                'format' => $file->getFormat(),
                'filePath' => $file->getFilePath(),
                'user' => [
                    'userId' => $file->getUser()->getId(),
                    'email' => $file->getUser()->getEmail(),
                    'totalStorage' => $file->getUser()->getTotalStorage(),
                    'usedStorage' => $file->getUser()->getUserStorage(),
                ]
            ];
        }

        return new JsonResponse($filesData);
    }

    #[Route('/api/admin/clients', name: 'list_clients', methods: ['GET'])]
    public function listClients(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $clientsData = [];
        $clients = $this->userRepository->findAll();

        foreach ($clients as $client) {
            $totalStorage = $client->getTotalStorage();
            $usedStorage = $client->getUserStorage();
            $availableStorage = $totalStorage - $usedStorage;

            $clientsData[] = [
                'id' => $client->getId(),
                'email' => $client->getEmail(),
                'totalStorage' => $totalStorage,
                'usedStorage' => $usedStorage,
                'availableStorage' => $availableStorage
            ];
        }

        return new JsonResponse($clientsData);
    }
}
