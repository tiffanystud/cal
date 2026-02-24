<?php

require_once __DIR__ . "/../services/CalendarsService.php";

class CalendarsController{


    public static function sendResponse($data, $status){
        http_response_code($status);
        echo json_encode($data);
        exit();
    }



    public static function handle($method, $input){

        if($method == "GET"){
            try{
                // OM det inte finns några parameter, hämta alla
                if(empty($input)){
                    return self::sendResponse(CalendarsService::calendarsGetAll(), 200);
                } else {
                    // Hämta en specifik calendar med id parameter
                    if(isset($input["id"])){
                        return self::sendResponse(CalendarsService::calendarsGetById($input), 200);
    
                    } else {
                        return self::sendResponse(["error" => "Value missing"], 400);
                    }
                } 
                // Denna tar emot flera catchs beroende på id eller alla
            } catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 400);
            } 
        }

        if($method == "POST"){
            try{
                if(!isset($input["creatorId"]) || !isset($input["name"]) || !isset($input["type"])){
                    return self::sendResponse(["error" => "Attributes missing"], 400);
                } else {
                    return self::sendResponse(CalendarsService::calendarsPost($input), 201);
                }
            } catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 400);
            }

        }

        if($method == "PATCH"){
            try{
                if(!isset($input["id"])){
                    return self::sendResponse(["error" => "Id missing"], 400);
                } else {
                    return self::sendResponse(CalendarsService::calendarsPatch($input), 200);
                }

            } catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 400);
            }

        }

        if($method == "DELETE"){
            try{
                if(!isset($input["id"])){
                    return self::sendResponse(["error" => "Only creator can delete group"], 400);
                } else {
                    return self::sendResponse(CalendarsService::calendarsDelete($input), 200);
                }

            } catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 400);
            }



        }

    }

}



?>