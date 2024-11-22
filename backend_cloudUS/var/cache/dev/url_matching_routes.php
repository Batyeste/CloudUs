<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/admin' => [[['_route' => 'app_admin', '_controller' => 'App\\Controller\\AdminController::index'], null, null, null, false, false, null]],
        '/api/admin/dashboard' => [[['_route' => 'admin_dashboard', '_controller' => 'App\\Controller\\AdminController::dashboard'], null, ['GET' => 0], null, false, false, null]],
        '/api/admin/files' => [[['_route' => 'list_all_files', '_controller' => 'App\\Controller\\AdminController::listAllFiles'], null, ['GET' => 0], null, false, false, null]],
        '/api/admin/clients' => [[['_route' => 'list_clients', '_controller' => 'App\\Controller\\AdminController::listClients'], null, ['GET' => 0], null, false, false, null]],
        '/api/login' => [
            [['_route' => 'api_login', '_controller' => 'App\\Controller\\AuthenticationController::login'], null, ['POST' => 0], null, false, false, null],
            [['_route' => 'api_login_check'], null, null, null, false, false, null],
        ],
        '/api/register' => [[['_route' => 'api_register', '_controller' => 'App\\Controller\\AuthenticationController::register'], null, ['POST' => 0], null, false, false, null]],
        '/api/register/admin' => [[['_route' => 'admin_register', '_controller' => 'App\\Controller\\AuthenticationController::registerAdmin'], null, ['POST' => 0], null, false, false, null]],
        '/api/file' => [[['_route' => 'app_file', '_controller' => 'App\\Controller\\FileController::index'], null, ['GET' => 0], null, false, false, null]],
        '/api/files/liste' => [[['_route' => 'liste_files', '_controller' => 'App\\Controller\\FileController::list_file'], null, null, null, false, false, null]],
        '/api/files/mesFichiers' => [[['_route' => 'list_mes_fichiers', '_controller' => 'App\\Controller\\FileController::list_mes_fichiers'], null, null, null, false, false, null]],
        '/api/files/upload' => [[['_route' => 'upload_file', '_controller' => 'App\\Controller\\FileController::upload'], null, ['POST' => 0], null, false, false, null]],
        '/api/files/delete' => [[['_route' => 'delete_files', '_controller' => 'App\\Controller\\FileController::delete'], null, ['POST' => 0], null, false, false, null]],
        '/user' => [[['_route' => 'app_user', '_controller' => 'App\\Controller\\UserController::index'], null, null, null, false, false, null]],
        '/api/user/buy-storage' => [[['_route' => 'buy_storage', '_controller' => 'App\\Controller\\UserController::buyStorage'], null, ['POST' => 0], null, false, false, null]],
        '/api/user/delete-account' => [[['_route' => 'delete_acccount', '_controller' => 'App\\Controller\\UserController::deleteUser'], null, ['DELETE' => 0], null, false, false, null]],
        '/api/code_verif' => [[['_route' => 'api_code_verif', '_controller' => 'App\\Controller\\AuthenticationController::sendConfirmationCodeEmail'], null, ['POST' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api(?'
                    .'|/(?'
                        .'|\\.well\\-known/genid/([^/]++)(*:46)'
                        .'|errors/(\\d+)(*:65)'
                        .'|validation_errors/([^/]++)(*:98)'
                    .')'
                    .'|(?:/(index)(?:\\.([^/]++))?)?(*:134)'
                    .'|/(?'
                        .'|docs(?:\\.([^/]++))?(*:165)'
                        .'|contexts/([^.]+)(?:\\.(jsonld))?(*:204)'
                        .'|validation_errors/([^/]++)(?'
                            .'|(*:241)'
                        .')'
                    .')'
                .')'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:280)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        46 => [[['_route' => 'api_genid', '_controller' => 'api_platform.action.not_exposed', '_api_respond' => 'true'], ['id'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        65 => [[['_route' => 'api_errors', '_controller' => 'api_platform.action.error_page'], ['status'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        98 => [[['_route' => 'api_validation_errors', '_controller' => 'api_platform.action.not_exposed'], ['id'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        134 => [[['_route' => 'api_entrypoint', '_controller' => 'api_platform.action.entrypoint', '_format' => '', '_api_respond' => 'true', 'index' => 'index'], ['index', '_format'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        165 => [[['_route' => 'api_doc', '_controller' => 'api_platform.action.documentation', '_format' => '', '_api_respond' => 'true'], ['_format'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        204 => [[['_route' => 'api_jsonld_context', '_controller' => 'api_platform.jsonld.action.context', '_format' => 'jsonld', '_api_respond' => 'true'], ['shortName', '_format'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        241 => [
            [['_route' => '_api_validation_errors_problem', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_problem'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_validation_errors_hydra', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_hydra'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_validation_errors_jsonapi', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'ApiPlatform\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_jsonapi'], ['id'], ['GET' => 0], null, false, true, null],
        ],
        280 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
