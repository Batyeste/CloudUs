<?php

namespace App\Repository;

use App\Entity\File;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<File>
 */
class FileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, File::class);
    }

    public function countUploadedToday(): int
    {
        $qb = $this->createQueryBuilder('f')
            ->select('COUNT(f.id)')
            ->where('f.uploadDate >= :today')
            ->setParameter('today', new \DateTime('today'));

        return (int) $qb->getQuery()->getSingleScalarResult();
    }

    public function countFilesByUser(): array
    {
        $qb = $this->createQueryBuilder('f')
            ->select('u.id AS userId, u.email, COUNT(f.id) AS fileCount')
            ->join('f.user', 'u')
            ->groupBy('u.id');

        return $qb->getQuery()->getResult();
    }

    public function findFiles(array $criteria = [], array $orderBy = []): array
{
    $qb = $this->createQueryBuilder('f');

    if (isset($criteria['user'])) {
        $qb->andWhere('f.user = :user')
           ->setParameter('user', $criteria['user']);
    }

    if (isset($criteria['format'])) {
        $qb->andWhere('f.format = :format')
           ->setParameter('format', $criteria['format']);
    }

    if (isset($criteria['minDate'])) {
        $qb->andWhere('f.uploadDate >= :minDate')
           ->setParameter('minDate', $criteria['minDate']);
    }

    if (isset($criteria['maxDate'])) {
        $qb->andWhere('f.uploadDate <= :maxDate')
           ->setParameter('maxDate', $criteria['maxDate']);
    }

    foreach ($orderBy as $field => $order) {
        $qb->addOrderBy('f.' . $field, $order);
    }

    return $qb->getQuery()->getResult();
}



//    /**
//     * @return File[] Returns an array of File objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?File
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
