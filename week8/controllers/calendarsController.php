<?php

class CalendarsController{
    public static function calendarHandler($method, $input){

        if($method == "GET"){
            try{
                // OM det inte finns några parameter, hämta alla
                if(empty($input)){
                    return calendarsService::calendarsGetAll();
                } else {
                    // Hämta en specifik calendar med id parameter
                    if(isset($input["id"])){
                        return calendarsService::calendarsGetById($input);
    
                    } else {
                        return ["error" => "Value missing", "code" => 400];
                    }
                } 
                // Denna tar emot flera catchs beroende på id eller alla
            } catch(emptyCalendars $error){
                return ["error" => $error, "code" => 404];
            } 
        }

        if($method == "POST"){
            try{
                if(!isset($input["creatorId"]) || !isset($input["name"]) || !isset($input["type"])){
                    return ["error" => "Attributes missing", "code" => 400];
                } else {
                    return calendarsPost($input);
                }
            } catch(Exception $error){
                // Kolla upp vad man kan returnera här och vad $error kommer bli sen
                // Samma att servicen kommer returnera någon fel kod och då måste vi vet vilken kod det är här att skicka tillbaka
            }

        }

        if($method == "PATCH"){
            try{
                if(!isset($input["id"])){
                    return ["error" => "Id missing", "code" => 400];
                } else {
                    return calendarsPatch($input);
                }

            } catch(Exception $error){
                return ["error" => $error, "code" => 400];
            }

        }

        if($method == "DELETE"){
            try{
                if(!isset($input["id"]) && !isset($input["creatorId"])){
                    return ["error" => "Only creator can delete group", "code" => 400];
                } else {
                    return calendarsDelete($input);
                }

            } catch(Exception $error){
                return ["error" => $error, "code" => 400];
            }



        }

    }

}



?>