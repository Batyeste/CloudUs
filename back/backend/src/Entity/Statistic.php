<?php

namespace App\Entity;

use App\Repository\StatisticRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StatisticRepository::class)]
class Statistic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $totalFiles = null;

    #[ORM\Column]
    private ?int $filesToday = null;

    #[ORM\Column]
    private ?int $filesPerUser = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTotalFiles(): ?int
    {
        return $this->totalFiles;
    }

    public function setTotalFiles(int $totalFiles): static
    {
        $this->totalFiles = $totalFiles;

        return $this;
    }

    public function getFilesToday(): ?int
    {
        return $this->filesToday;
    }

    public function setFilesToday(int $filesToday): static
    {
        $this->filesToday = $filesToday;

        return $this;
    }

    public function getFilesPerUser(): ?int
    {
        return $this->filesPerUser;
    }

    public function setFilesPerUser(int $filesPerUser): static
    {
        $this->filesPerUser = $filesPerUser;

        return $this;
    }
}
