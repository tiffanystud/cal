<?php

require_once __DIR__ . "/../../services/EventAdminsService.php";
require_once __DIR__ . "/../sendJSON.php";

class EventAdminsController {
    public static function handle($method, $input) {

        try {
            if($method == "GET") {
                if(isset($input["eventId"]) && isset($input["userId"])) {
                    $data = EventAdminsService::getByParams($input);
                    sendJSON([$data],200);
                }
                if(isset($input["eventId"])) {
                    $data = EventAdminsService::getByParams($input);
                    sendJSON([$data],200);
                }
                if(isset($input["userId"])) {
                    $data = EventAdminsService::getByParams($input);
                    sendJSON([$data],200);
                }
                if(empty($input)) {
                    $data = EventAdminsService::getAll($input);
                    sendJSON([$data],200);
                }
                throw new Exception("Missing attributes");

            } elseif($method == "POST") {
                if(!isset($input["userId"]) || !isset($input["eventId"]) || !isset($input["canDelete"]) || !isset($input["canEdit"]) || !isset($input["isCreator"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventAdminsService::post($input);
                sendJSON([$data],200);

            } elseif($method == "PATCH") {
                if(!isset($input["userId"]) || !isset($input["eventId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventAdminsService::patch($input);
                sendJSON([$data],200);

            } elseif($method == "DELETE") {
                if(!isset($input["userId"]) || !isset($input["eventId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = EventAdminsService::delete($input);
                sendJSON([$data],200);
            }
        } catch(Exception $error) {
            self::errorHandler($error);
        }

        
    }
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //GET PARAMS
        if($message == "Not found") {
            sendJSON(["error" => "Not found"], 404);
        }

        //POST
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message == "Not found") {
            sendJSON(["error" => "Not found"], 404);
        }

        //PATCH
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message == "Not found") {
            sendJSON(["error" => "Not found"], 404);
        }


        //DELETE
        if($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }
        if($message == "Not found") {
            sendJSON(["error" => "Not found"], 404);
        }


    }
}

?>