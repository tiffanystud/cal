<?php

require_once __DIR__ . "/../../services/EventsService.php";
require_once __DIR__ . "/../sendJSON.php";




class EventsController {
    
    public static function handle($method, $input) {
        try {
            if($method == "GET") {
                if(isset($input["calId"])) {
                    $data = EventsService::getByParams($input);
                    sendJSON($data,200);
                }
                if(isset($input["eventId"])) {
                    $data = EventsService::getByParams($input);
                    sendJSON($data,200);
                }
                if(empty($input)) {
                    $data = EventsService::getAll($input);
                    sendJSON($data,200);
                }

            } elseif($method == "POST") {
                if(!isset($input["type"]) || !isset($input["name"]) || !isset($input["date"]) || !isset($input["time"]) || !isset($input["location"]) || !isset($input["needsConfirmation"]) || !isset($input["tags"]) || !isset($input["participationLimit"]) || !isset($input["description"]) || !isset($input["calId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventsService::post($input);
                sendJSON($data,201);

            } elseif($method == "PATCH") {
                if(!isset($input["eventId"]) || !isset($input["calId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventsService::patch($input);
                sendJSON($data,200);
            } elseif($method == "DELETE") {
                if(!isset($input["eventId"]) || !isset($input["calId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventsService::delete($input);
                sendJSON($data,200);
            }
        } catch (Exception $error) {
            self::errorHandler($error);
        }
        
    }
    
        
    
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //GET PARAMS
        if($message === "No event(s) found") {
            sendJSON(["error" => "No event(s) found"], 404);
        }

        //POST
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message === "Cal not found") {
            sendJSON(["error" => "Cal not found"], 404);
        }

        //PATCH
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message === "Not found") {
            sendJSON(["error" => "Not found"], 404);
        }

        //DELETE
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message === "Not found") {
            sendJSON(["error" => "Not found"], 404);
        }

    }
}

?>