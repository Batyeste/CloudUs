<?php

namespace App\Service;

use App\Entity\File;
use App\Entity\User;
use App\Repository\FileRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileService
{

    private $fileRepository;
    public function __construct(private EntityManagerInterface $entityManager,FileRepository $fileRepository) {
        $this->fileRepository = $fileRepository;
    }

    public function uploadFile(User $user, UploadedFile $file): File
{
    // Calculer la taille du fichier en Ko
    $fileSize = $file->getSize() / 1024;

    // Vérifier si l'utilisateur a suffisamment d'espace
    if (($user->getUserStorage() + $fileSize) > $user->getTotalStorage()) {
        throw new \Exception('Espace de stockage insuffisant');
    }

    // Générer un nom unique basé sur le nom d'origine, la date, et l'heure
    $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
    $timestamp = (new \DateTime())->format('Y-m-d_H-i-s');
    $extension = $file->getClientOriginalExtension();
    $formattedName = sprintf('%s_%s.%s', $originalName, $timestamp, $extension);

    // Créer un nouvel objet File
    $uploadedFile = new File();
    $uploadedFile->setName($formattedName)
                 ->setFileSize($fileSize)
                 ->setFormat($extension)
                 ->setFilePath('/uploads/' . $formattedName)
                 ->setUser($user);

    // Enregistrer le fichier sur le serveur
    $file->move('uploads', $formattedName);

    // Mettre à jour l'espace de stockage de l'utilisateur
    $user->setUserStorage($user->getUserStorage() + $fileSize);

    // Sauvegarder les changements dans la base de données
    $this->entityManager->persist($uploadedFile);
    $this->entityManager->persist($user);
    $this->entityManager->flush();

    return $uploadedFile;
}


     /**
     * Trouver un fichier par son identifiant
     *
     * @param int $fileId
     * @return File|null
     */
    public function findFileById(int $fileId): ?File
    {
        return $this->fileRepository->find($fileId);
    }

    

    public function deleteFile(File $file): void
    {
        // Supprimer le fichier du serveur
        if (file_exists($file->getFilePath())) {
            unlink($file->getFilePath());
        }

        // Mettre à jour l'espace de stockage de l'utilisateur
        $user = $file->getUser();
        $user->setUserStorage($user->getUserStorage() - $file->getFileSize());

        // Supprimer le fichier de la base de données
        $this->entityManager->remove($file);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
