<?php

require_once __DIR__ . "/../../services/EventsRSVPServices.php";
require_once __DIR__ . "/../sendJSON.php";

class EventsRSVPController {
    public static function handle($method, $input) {
        try {
            if($method == "GET") {
                if(!isset($input["userId"]) || !isset($input["eventId"])) {
                    throw new Exception("Missing attributes");
                } 
                $data = EventsRSVPServices::getByParams($input);
                sendJson([$data],200);
                
            } elseif($method == "POST") {
                if(!isset($input["userId"]) || !isset($input["eventId"]) || !isset($input["isGoing"]) || !isset($input["reminder"])) {
                    throw new Exception("Missing attributes");
                } 
                $data = EventsRSVPServices::post($input);
                sendJson([$data],201);
    
            } elseif($method == "PATCH") {
                if(!isset($input["userId"]) || !isset($input["eventId"])) {
                    throw new Exception("Missing attributes");
                } 
                $data = EventsRSVPServices::patch($input);
                sendJson([$data],200);
            } elseif($method == "DELETE") {
                if(!isset($input["userId"]) || !isset($input["eventId"])) {
                    throw new Exception("Missing attributes");
                } 
                $data = EventsRSVPServices::delete($input);
                sendJson([$data],200);
            }
        } catch(Exception $error) {
            self::errorHandler($error);
        }
    }
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //GET PARAMAS
        if($message === "Missing attributesd") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "RSVP not found") {
            sendJson(["error" => "RSVP not found"], 404);
        }

        //POST
        if($message === "Missing attributesd") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "RSVP already exists") {
            sendJson(["error" => "RSVP already exists"], 409);
        }

        //PATCH
        if($message === "Missing attributesd") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "RSVP not found") {
            sendJson(["error" => "RSVP not found"], 404);
        }

        //DELETE
        if($message === "Missing attributesd") {
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "RSVP not found") {
            sendJson(["error" => "RSVP not found"], 404);
        }
        

        



        
    }

}