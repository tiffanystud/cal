<?php

//

require_once __DIR__ . "/../../services/PinnedCalendarsService.php";
require_once __DIR__ . "/../sendJSON.php";

class PinnedCalendarsController{

    public static function handle($method, $input){

        try {

            if($method == "GET"){
                $data = PinnedCalendarsService::get();
                sendJson([$data], 200);

            } else if($method == "POST"){
                if(!isset($input["userId"]) || !isset($input["calId"])) {
                    throw new Exception("Missing attributes");
                }
                $data = PinnedCalendarsService::post($input);
                sendJson([$data],200);

            } else if($method == "DELETE"){
                if(!isset($input["userId"]) || !isset($input["calId"])) {
                    throw new Exception("Missing attributes");
                } 
                $data = PinnedCalendarsService::delete($input);
                sendJson([$data],200);
            }

        } catch(Exception $error) {
            self::errorHandler($error);
        }



    }
    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        //POST
        if($message === "Missing attributes" ){
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "Calendar already pinned" ){
            sendJson(["error" => "Calendar already pinned"], 409);
        }

        //DELETE
        if($message === "Missing attributes" ){
            sendJson(["error" => "Missing attributes"], 400);
        }
        if($message === "Not found" ){
            sendJson(["error" => "Not found"], 404);
        }

    }





}




?>