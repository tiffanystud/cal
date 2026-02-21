<?php

// Middleware
require_once __DIR__ . "/../middleware/middleware.php";

// Controllera
require_once "BackupDBController.php";
require_once "RestoreDBController.php";
require_once "UsersController.php";
require_once "GroupsController.php";
require_once "UsersGroupsController.php";
require_once "UsersAvailabilitiesController.php";


function Router($requestUrl = null){   
    
    if ($requestUrl === null) {
        $requestUrl = $_SERVER["REQUEST_URI"] ?? "";
    }

    error_log("ROUTER: requestUrl = " . $requestUrl);
    error_log("ROUTER: urlPath = " . parse_url($requestUrl, PHP_URL_PATH));
    $urlPath = parse_url($requestUrl, PHP_URL_PATH);
    $path = ltrim($urlPath, "/");
    error_log("ROUTER: computed path = " . $path);

    $method = $_SERVER["REQUEST_METHOD"];
    
    if($method == "GET"){
        $input = $_GET ?? [];
    } else {
        $input = json_decode(file_get_contents("php://input"), true) ?? [];
    }

    switch ($path) {
            
        case "backup_database":
            CorsMiddleware::handle();
            BackupDBController::handle();
            break;

        case "restore_database":
            CorsMiddleware::handle();
            RestoreDBController::handle();
            break;

        case "calendar":
            
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

        case "calendar_msg": 
            //Handle calendar_msg
            break;

        case "events":
            //Handle events
            break;

        case "event_admins":
            //Handle event_admins
            break;

        case "event_rsvp":
            //Handle event_rsvp
            break;

        case "friendships":
            //Handle friendships
            break;

        case "private_msg":
            //Handle private msg
            break;

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

        case "users_availabilities":
            
            switch ($method) {
               case "GET": 
                    CorsMiddleware::handle();
                    UsersAvailabilitiesController::handle($method, $input);
                    break;
                   
                default:
                    CorsMiddleware::handle();
                    JsonMiddleware::handle();
                    UsersAvailabilitiesController::handle(method: $method, input: $input);
                    break;
            }
            break;
            
        case "users_calendars":
            
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

        case "users_pinned_calendars":
            //Handle users_pinned_calendars
            break;
            
        default:
            http_response_code(404); 
            echo json_encode(["error" => "Route not found"]); 
            break;
    }
}
