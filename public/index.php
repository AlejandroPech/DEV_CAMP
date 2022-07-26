<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
$dependencies = require __DIR__ . '/../src/dependencies.php';
$dependencies($app);

// Register middleware
$middleware = require __DIR__ . '/../src/middleware.php';
$middleware($app);

// Register routes
$routes = require __DIR__ . '/../src/routes.php';
$routes($app);


//Configurar Eloquent Conexion
$container = $app->getContainer();

//Cargar dinamicamente los modelos y contraladores al proyecto
$base = __DIR__ . '/../app/';

$folders = [    
    'http',
    'sidebar'
];

foreach($folders as $f){	
    foreach (glob($base . "$f/*.php") as $k => $filename){
        require $filename;
    }//fin:foreach
}//fin:foreach
//-----------------------------------------------------------------------------
//Configurar Eloquent Conexion
$container = $app->getContainer();

$capsule = new \Illuminate\Database\Capsule\Manager;
//-----------------------------------------------------------
$dbEnv = "";
switch($container['settings']['environment']){
    case "dev": 
        $dbEnv = "desarrollo";            
    break;
    case "prod": 
        $dbEnv = "produccion";            
    break;            
}//fin:switch

$capsule->addConnection($container['settings']['database'][$dbEnv]['CONEXION'], 'CONEXION');

$capsule->setAsGlobal();
$capsule->bootEloquent();

//Cargar dinamicamente los modelos y contraladores al proyecto
$base = __DIR__ . '/../app/';

$folders = [    
    'Models',
    'Controllers'
];

foreach($folders as $f){	
    foreach (glob($base . "$f/*.php") as $k => $filename){
        require $filename;
    }//fin:foreach
}//fin:foreach
//-----------------------------------------------------------------------------
$container['view'] = function ($container) {
            
    $view = new \Slim\Views\Twig(__DIR__."/../templates", ["cache" => false]);
    // Instantiate and add Slim specific extension
        
    $router = $container->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new \Slim\Views\TwigExtension($router, $uri));

    return $view;
};
$container['ConsultaController'] = function($container){ return new App\Controllers\ConsultaController($container);};
$container['CajeroController']   = function($container){ return new App\Controllers\CajeroController  ($container);};

// Run app
$app->run();