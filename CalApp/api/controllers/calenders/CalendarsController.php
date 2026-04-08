<?php

require_once __DIR__ . "/../services/calendarsService.php";
require_once "sendJSON.php";
class CalendarsController{

    public static function handle($method, $input){
        try {
            data = serviceMethod()
        } catch(Exeption $e) {  

            $msg = $e->getMasseage();
            if($msg === "Missing attributes") {
                sendJson(["error" => $msg], 400)
            }

        }
        sendJson(data, 200)

    }

}



?>