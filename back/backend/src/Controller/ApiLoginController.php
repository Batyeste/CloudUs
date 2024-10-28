<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): Response
    {

        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
'email'  => $user->getUserIdentifier(),
                        'nom'=>$user->getNom(),
                        'prenom'=>$user->getPrenom()
        ]);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
       
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Accéder aux données du JSON
        $email = $data['username'];
        $password = $data['password'];
        $nom = $data['nom'];
        $prenom = $data['prenom'];
        $adresse = $data['adresse'];

        $user = new User();

        $user->setEmail($email);
        $user->setPrenom($prenom);
        $user->setNom($nom);
        $user->setAdresse($adresse);

        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $password
            )
        );

        $entityManager->persist($user);
        $entityManager->flush();



        // Traiter les données ici
        // Par exemple, vous pouvez les sauvegarder en base de données

        // Retourner une réponse JSON
        return new JsonResponse([
            'status' => 'Inscription effectuée',
        ]);
    }
}
