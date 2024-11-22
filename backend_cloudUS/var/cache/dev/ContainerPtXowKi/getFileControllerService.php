<?php

namespace ContainerPtXowKi;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getFileControllerService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'App\Controller\FileController' shared autowired service.
     *
     * @return \App\Controller\FileController
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'vendor'.\DIRECTORY_SEPARATOR.'symfony'.\DIRECTORY_SEPARATOR.'framework-bundle'.\DIRECTORY_SEPARATOR.'Controller'.\DIRECTORY_SEPARATOR.'AbstractController.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Controller'.\DIRECTORY_SEPARATOR.'FileController.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Service'.\DIRECTORY_SEPARATOR.'FileService.php';

        $a = ($container->privates['App\\Repository\\FileRepository'] ?? $container->load('getFileRepositoryService'));

        $container->services['App\\Controller\\FileController'] = $instance = new \App\Controller\FileController($a, ($container->privates['App\\Repository\\UserRepository'] ?? $container->load('getUserRepositoryService')), new \App\Service\FileService(($container->services['doctrine.orm.default_entity_manager'] ?? self::getDoctrine_Orm_DefaultEntityManagerService($container)), $a), ($container->privates['App\\Service\\EmailService'] ?? $container->load('getEmailServiceService')));

        $instance->setContainer(($container->privates['.service_locator.O2p6Lk7'] ?? $container->load('get_ServiceLocator_O2p6Lk7Service'))->withContext('App\\Controller\\FileController', $container));

        return $instance;
    }
}
