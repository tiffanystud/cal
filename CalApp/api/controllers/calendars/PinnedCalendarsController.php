<?php

require_once __DIR__ . "/../../services/PinnedCalendarsService.php";

class PinnedCalendarsController{


    public static function sendResponse($data, $status){
        http_response_code($status);
        echo json_encode($data);
        exit();
    }


    public static function handle($method, $input){

        if($method == "GET"){
            try{
                if(empty($input)){
                    return self::sendResponse(PinnedCalendarsService::pinnedCalendarsGetAll(), 200);
                } else {
                    if(isset($input["userId"])){
                        return self::sendResponse(PinnedCalendarsService::pinnedCalendarsGetById($input), 200);
                    } else {
                        return self::sendResponse(["error" => "UserId missing"], 404);
                    }
                }
            }catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 400);
            }
        } else if($method == "POST"){
            try{
                if(!isset($input["userId"]) || !isset($input["calId"])){
                    return self::sendResponse(["error" => "Attributes missing"], 400);
                } else {
                    return self::sendResponse(PinnedCalendarsService::pinnedCalendarsPost($input), 201);
                }
            
            }catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 400);
            }

        } else if($method == "PATCH"){
            try{
                if(!isset($input["id"])){
                   return self::sendResponse(["error" => "Missing attributes"], 400);
                } else if(!$input > 1){
                   return self::sendResponse(["error" => "Missing attributes"], 400);
                } else {
                    return self::sendResponse(PinnedCalendarsService::pinnedCalendarsPatch($input), 200);
                }


            } catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 400);
            }
        } else if($method == "DELETE"){
            try{
                if(!isset($input["id"])){
                    return self::sendResponse(["error" => "Missing attributes"], 400);
                } else {
                    return self::sendResponse(PinnedCalendarsService::pinnedCalendarsDelete($input), 200);
                }
            } catch(Exception $error){
                return self::sendResponse(["error" => $error->getMessage()], 404);
            }
        }


    }





}




?>