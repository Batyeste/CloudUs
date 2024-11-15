<?php

namespace App\Controller;

use App\Entity\File;
use App\Repository\FileRepository;
use App\Repository\UserRepository;
use App\Service\EmailService;
use App\Service\FileService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class FileController extends AbstractController
{

    private $emailService ;
    private $filerepository;

    private $fileService;
    private $userRepository; 

    public function __construct(FileRepository $fileRepository,UserRepository $userRepository, FileService $fileService,EmailService $emailService) {
        $this->filerepository = $fileRepository;
        $this->fileService = $fileService;
        $this->emailService = $emailService;
        $this->userRepository = $userRepository;
    }


    #[Route('/file', name: 'app_file', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('file/index.html.twig', [
            'controller_name' => 'FileController',
        ]);
    }

    #[Route('/files/liste', name: 'liste_files')]
    public function list_file(): Response
    {
        $files = $this->filerepository->findAll();
        return $this->json($files, 200, [], ['groups' => 'file_view']);
    }


    #[Route('/files/mesFichiers', name: 'list_mes_fichiers')]
    public function list_mes_fichiers(Request $request): Response
    {
        $mail = $this->userRepository->decodeToken($request);

        $user = $this->userRepository->findOneBy(["email" => $mail]);
        $files = $user->getFile();
        return $this->json($files, 200, [], ['groups' => 'file_view']);
    }




    #[Route('/files/upload', name: 'upload_file', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $file = $request->files->get('file');
        

        try {
            $uploadedFile = $this->fileService->uploadFile($user, $file);
            return new JsonResponse(['status' => 'File uploaded', 'file' => $uploadedFile], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'Upload failed', 'error' => $e->getMessage()], 400);
        }
    }

    #[Route('/files/delete', name: 'delete_files', methods: ['POST'])]
    public function delete(Request $request): JsonResponse
    {
        // Récupérer l'utilisateur actuel
        $user = $this->getUser();
        $user = $this->userRepository->findOneBy(["email" => $user->getUserIdentifier()]);


        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Récupérer les IDs de fichiers à supprimer à partir du corps de la requête
        $fileIds = $data['fileIds'];
        if (empty($fileIds) || !is_array($fileIds)) {
            return new JsonResponse(['error' => 'No file IDs provided or invalid format'], 400);
        }

        $deletedFilesCount = 0;

        foreach ($fileIds as $fileId) {
            $file = $this->fileService->findFileById($fileId);

            // Vérifiez si le fichier appartient bien à l'utilisateur avant de supprimer
            if ($file && $file->getUser()->getId() === $user->getId()) {
                $this->fileService->deleteFile($file);
                $deletedFilesCount++;
            }
        }

        // Envoyer une notification de suppression de fichier
        $this->emailService->sendFileDeletionNotification($user->getEmail(), $deletedFilesCount);

        return new JsonResponse([
            'status' => 'Files deleted',
            'deletedFilesCount' => $deletedFilesCount
        ], 200);
    }
}
