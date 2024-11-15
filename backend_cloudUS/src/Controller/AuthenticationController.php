<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\EmailService;
use Symfony\Component\Routing\Attribute\Route;

use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthenticationController extends AbstractController
{

    private $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): Response
    {

        if (null === $user) {
            return $this->json([
                'message' => 'Adresse ou mot de passe invalide',
            ], Response::HTTP_UNAUTHORIZED);
        }

       

        return $this->json([
'email'  => $user->getUserIdentifier(),
                        'nom'=>$user->getNom(),
                        'prenom'=>$user->getPrenom(),
                        'Role' => $user->getRoles()
        ]);
    }
    

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
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
        $date = new \DateTimeImmutable();


        $user = new User();
        $user->setEmail($email);
        $user->setPrenom($prenom);
        $user->setNom($nom);
        $user->setAdresse($adresse);
        $user->setCreateAt($date);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $password
            )
        );
        $user->setTotalStorage(20 * 1024 * 1024);
        $user->setUserStorage(0);

        $entityManager->persist($user);
        $entityManager->flush();



        // Traiter les données ici
        // Par exemple, vous pouvez les sauvegarder en base de données
        $this->sendConfirmationEmail($user);
        // Retourner une réponse JSON
        return new JsonResponse([
            'status' => 'Inscription effectuée',
        ]);
    }


    #[Route('/api/register/admin', name: 'admin_register', methods: ['POST'])]
    public function registerAdmin(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
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
        $date = new \DateTimeImmutable();


        $user = new User();
        $user->setEmail($email);
        $user->setPrenom($prenom);
        $user->setNom($nom);
        $user->setAdresse($adresse);
        $user->setCreateAt($date);
        $user->setRoles(["ROLE_ADMIN"]);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $password
            )
        );
        $user->setTotalStorage(20 * 1024 * 1024);
        $user->setUserStorage(0);

        $entityManager->persist($user);
        $entityManager->flush();



        // Traiter les données ici
        // Par exemple, vous pouvez les sauvegarder en base de données
        $this->sendConfirmationEmail($user);
        // Retourner une réponse JSON
        return new JsonResponse([
            'status' => 'Inscription effectuée',
        ]);
    }
    

    private function sendConfirmationEmail(User $user): void
    {
        $subject = "Comformation Inscription";
        $content = "Nous vous confirmons que votre compte a été crée avec succes";
        $this->emailService->sendEmail($user->getEmail(), $subject, $content);
    }

    #[Route('/api/code_verif', name: 'api_code_verif', methods: ['POST'])]
    public function sendConfirmationCodeEmail(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
    
        if (!$email) {
            return new Response('Email is required', Response::HTTP_BAD_REQUEST);
        }
    
        $confirmationCode = $this->getConfirmationCode();

        $subject = "Code de confirmation";
        $content = "Voici le code que vous devez utiliser pour confirmer votre compte: " . $confirmationCode;
        $this->emailService->sendEmail($email, $subject, $content);
    
        return new Response($confirmationCode, Response::HTTP_OK);
    }

    private $generatedCode = '';
    private $codeGenerated = false;

    private function getConfirmationCode() : string
    {
        $code = strtoupper(substr(md5(mt_rand()), 0, 6));
        $this->generatedCode = $code;
        $this->codeGenerated = true;

        return $code;
    }
}
