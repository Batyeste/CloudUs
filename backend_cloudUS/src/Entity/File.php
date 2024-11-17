<?php

namespace App\Entity;

use App\Repository\FileRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FileRepository::class)]
class File
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['file_view'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['file_view'])]
    #[Assert\NotBlank]
    private ?string $name = null;

    #[ORM\Column(type: 'integer')]
    #[Groups(['file_view'])]
    #[Assert\NotBlank]
    private ?int $fileSize = null; // Taille en Ko

    #[ORM\Column(type: 'datetime')]
    #[Groups(['file_view'])]
    private ?\DateTimeInterface $uploadDate = null;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['file_view'])]
    #[Assert\NotBlank]
    private ?string $format = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['file_view'])]
    #[Assert\NotBlank]
    private ?string $filePath = null;

    #[ORM\ManyToOne(inversedBy: 'file')]
    #[Groups(['file_user'])]
    private ?User $user = null;


    public function __construct()
    {
        $this->uploadDate = new \DateTime();
    }

    // Getters et Setters


    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFileSize(): ?int
    {
        return $this->fileSize;
    }

    public function setFileSize(int $fileSize): self
    {
        $this->fileSize = $fileSize;

        return $this;
    }

    public function getUploadDate(): ?\DateTimeInterface
    {
        return $this->uploadDate;
    }

    public function setUploadDate(\DateTimeInterface $uploadDate): self
    {
        $this->uploadDate = $uploadDate;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(string $format): self
    {
        $this->format = $format;

        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
    
}
