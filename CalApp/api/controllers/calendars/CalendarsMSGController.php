
<?php

require_once __DIR__ . "/../services/CalendarsMSGService.php";
require_once __DIR__ . "sendJSON.php";

class CalendarsMSGController {
    
    public static function handle($method, $input){

        try {
            if($method === "GET") {
                if(!isset($input["calId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = CalendarsMSGService::getByParams($input);
                sendJson([$data],200);
    
            } else if($method === "POST") {
                if(!isset($input["senderId"]) || !isset($input["calId"]) || !isset($input["content"])  ) {
                    throw new Exception("Missing attributes");
                }
                $data = CalendarsMSGService::post($input);
                sendJson([$data],201);
                
            } else if($method === "PATCH") {
                if(!isset($input["id"]) || !isset($input["calId"]) || !isset($input["content"])  ) {
                    throw new Exception("Missing attributes");
                }
                $data = CalendarsMSGService::patch($input);
                sendJson([$data],200);
                
            } else if($method === "DELETE") {
                if(!isset($input["id"])) {
                    throw new Exception("Missing attributes");
                }
                $data = CalendarsMSGService::delete($input);
                sendJson([$data],200);
    
            }
        } catch(Exception $error) {
            self::errorHandler($error);
        }

        


    }
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //GET PARAMS
        if($message === "Missing attributes" ){
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "Messages not found" ){
            sendJson(["error" => "Messages not found"], 404);
        }


        //POST
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "Invalid calendar") {
            sendJson(["error" => "Invalid calendar"], 404);

        }


        //PATCH
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "Message not found") {
            sendJson(["error" => "Message not found"], 404);
        }

        
        //DELETE
        if($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        } 
        if($message === "Message not found") {
            sendJson(["error" => "Message not found"], 404);
        }

    }
}