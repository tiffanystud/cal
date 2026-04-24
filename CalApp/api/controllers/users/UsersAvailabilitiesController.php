<?php

require_once __DIR__ . "/../../services/UsersAvailabilitiesService.php";
require_once __DIR__ . "/../sendJSON.php";

class UsersAvailabilitiesController {
    public static function handle($method, $input) { 
        try {

            if($method === "GET") {
                if(isset($input["userId"]) && isset($input["date"])) {
                    $data = UsersAvailabilitiesService::getByParams($input);
                    sendJSON($data,200);
                } else {
                    throw new Exception("Missing attributes");
                }
            
            } elseif($method === "POST") {
                $data = UsersAvailabilitiesService::post($input);
                sendJSON($data,201);
            } elseif($method === "PATCH") {
                $data = UsersAvailabilitiesService::patch($input);
                sendJSON($data,200);
            } elseif($method === "DELETE") {
                $data = UsersAvailabilitiesService::delete($input);
                sendJSON($data,200);
            }

        } catch(Exception $error) {
            self::errorHandler($error);
        }
    }
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //GET PARAMS
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message === "Availability not found") { 
            sendJSON(["error" => "Availability not found"], 404);
        }
        //POST
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message === "User or calendar not found") {
            sendJSON(["error" => "User or calendar not found"], 404);
        }
        if($message === "Availability already exists") {
            sendJSON(["error" => "Availability already exists"], 409);
        }
    
        //PATCH
        if($message === "Missing attributes") { 
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message === "Availability not found") { 
            sendJSON(["error" => "Availability not found"], 404);
        }
        if($message === "No changes made") { 
            sendJSON(["error" => "No changes made"], 409);
        }

        //DELETE
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message === "Availability not found") { 
            sendJSON(["error" => "Availability not found"], 404);
        }
    }
}