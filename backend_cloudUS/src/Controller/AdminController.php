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
        // Nombre total d'utilisateurs
        $totalUsers = $userRepository->count([]);

        // Nombre total de fichiers
        $totalFiles = $fileRepository->count([]);

        // Nombre de fichiers uploadés aujourd'hui
        $filesToday = $fileRepository->countUploadedToday();

        // Répartition du nombre de fichiers par utilisateur
        $filesByUser = $fileRepository->countFilesByUser();

        return new JsonResponse([
            'totalUsers' => $totalUsers,
            'totalFiles' => $totalFiles,
            'filesUploadedToday' => $filesToday,
            'filesByUser' => $filesByUser,
        ]);
    }
}
