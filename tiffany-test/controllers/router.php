<?php

// Middleware
require_once __DIR__ . "/../middleware/middleware.php";

// Controllera
require_once "UsersController.php";
require_once "GroupsController.php";
require_once "UsersGroupsController.php";


function Router($requestUrl){   
    $urlPath = parse_url($requestUrl, PHP_URL_PATH);
    $path = ltrim($urlPath, "/");
    $method = $_SERVER["REQUEST_METHOD"];
    
    if($method == "GET"){
        $input = $_GET ?? [];
    } else {
        $input = json_decode(file_get_contents("php://input"), true) ?? [];
    }

    switch ($path) {
        
        case "users":
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    UsersController::handle($method, $input);
                    break;
                   
                    
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    UsersController::handle(method: $method, input: $input);
                    break;
            }
            break;
            
        case "groups":
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    GroupsController::handle(method: $method, input: $input);
                    break;
                    
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    GroupsController::handle(method: $method, input: $input);
                    break;
            }
            break;
            
        case "users_groups":
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    UsersGroupController::handle(method: $method, input: $input);
                    break;
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    UsersGroupController::handle(method: $method, input: $input);
                    break;
            }        
            break;
            
        default:
            http_response_code(404); 
            echo json_encode(["error" => "Route not found"]); 
            break;
    }
}
