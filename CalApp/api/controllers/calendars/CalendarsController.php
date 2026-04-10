<?php

require_once __DIR__ . "/../services/CalendarsService.php";
require_once "sendJSON.php";
class CalendarsController{

    public function handle($method, $input){



        if($method === "GET") {
            try {
                if(empty($input)) {
                    $data = CalendarsService::getAll();
                    sendJson([$data],200);
                } else {
                    if(!isset($input["id"])) {
                        throw new Exception("value missing");
                    }
                    $data = CalendarsService::getByParams($input);
                    sendJson([$data],200);
                }
            } catch(Exception $error) {
                self::errorHandler($error);
            }
            

        } else if($method === "POST") {
            try {
                if(!isset($input["userId"]) || !isset($input["name"]) || !isset($input["type"])) {
                    throw new Exception("Missing attributes");
                } 
                $data = CalendarsService::post($input);
                sendJson([$data],200);

            } catch(Exception $error) {
                self::errorHandler($error);
            }

        } else if($method === "PATCH") {
            try {
                if(!isset($input["id"])) {
                    throw new Exception("Id missing");
                } 
                if (!isset($input["name"]) && !isset($input["description"]) && !isset($input["type"])) {
                    throw new Exception("No values to change");
                }
                $data = CalendarsService::patch($input);
                sendJson([$data], 200);
                
            } catch(Exception $error) {
                self::errorHandler($error);
            }

        } else if($method === "DELETE") {
            try {
                if(!isset($input["id"]) || !isset($input["creatorId"])) {
                    throw new Exception("Missing attributes");
                } 
                $data = CalendarsService::delete($input);
                sendJson([$data], 200);

            } catch(Exception $error) {
                self::errorHandler($error);
            }

        }


    }
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //GET
        if($message === "No calendars found" ){
            sendJson(["error" => "No calendars found"], 404);
        }
        //GET PARAMS
        if($message === "Value missing" ){
            sendJson(["error" => "Value missing"], 400);
        }
        if($message === "No calendars found" ){
            sendJson(["error" => "No calendars found"], 404);
        }


        //POST
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "User is already in group with same name") {
            sendJson(["error" => "User is already in group with same name"], 409);

        }


        //PATCH
        if($message === "Id missing") {
            sendJson(["error" => "Id missing"], 400);
        }
        if($message === "No values to change") {
            sendJson(["error" => "No values to change"], 400);
        }

        
        //DELETE
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        } 
        if($message === "No calendar exists to delete") {
            sendJson(["error" => "No calendar exists to delete"], 404);
        }

    }

}



?>