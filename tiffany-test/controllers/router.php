<?php

// Middleware
require_once __DIR__ . "/../middleware";

// Controllera
require_once "GroupController.php";
require_once "UsersController.php";
require_once "UsersGroupController.php";




function Router($requestUrl){   

    $urlPath = parse_url($requestUrl, PHP_URL_PATH);
    $path = ltrim($urlPath, "/");
    $method = $_SERVER["REQUEST_METHOD"];

    switch ($path) {
        case "users":
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    UsersController::handle(method: $method, input: []);
                    break;
                    
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    UsersController::handle(method: $method, input: []);
                    break;
            }
        case "groups":
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    GroupsController::handle(method: $method, input: []);
                    break;
                    
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    GroupsController::handle(method: $method, input: []);
                    break;
            }
            
        case "users_groups":
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    UsersGroupController::handle(method: $method, input: []);
                    break;
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    UsersGroupController::handle(method: $method, input: []);
                    break;
            }
    }
}
