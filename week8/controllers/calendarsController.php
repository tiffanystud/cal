<?php

class calendarsController{
    public static function calendarHandler($method, $input){

        if($method == "GET"){
            try{
                if(empty($input)){
                    return calendarsService::getAll();
                } else {
                    // Hämta en specifik calendar med id
                    if(isset($input["id"])){
                        return calendarsService::getById($input);
    
                    } else {
                        return ["error" => "Value missing", "code" => 400];
                    }
                } 
            } catch(Exception $error){

            }       
        }

        if($method == "POST"){
            try{
                if(!isset($input["creatorId"]) || !isset($input["name"]) || !isset($input["type"])){
                    return ["error" => "Attributes missing", "code" => 400];
                } else {
                    return calendarPost($input);
                }
            } catch(Exception $error){
                // Kolla upp vad man kan returnera här och vad $error kommer bli sen
                // Samma att servicen kommer returnera någon fel kod och då måste vi vet vilken kod det är här att skicka tillbaka
            }

        }

        if($method == "PATCH"){
            try{
                if(!isset($input["id"])){
                    
                }

            } catch(Exception $error){

            }

        }

        if($method == "DELETE"){



        }

    }

}



?>