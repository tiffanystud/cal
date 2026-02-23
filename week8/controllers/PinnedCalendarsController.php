<?php

class PinnedCalendarsController{

    public static function pinnedCalendarsHandler($method, $input){

        if($method == "GET"){
            try{
                if(empty($input)){
                    return pinnedCalendarsService::pinnedCalendarsGetAll();
                } else {
                    if(isset($input["userId"])){
                        return pinnedCalendarsGetById($input);
                    } else {
                        return ["error" => "UserId missing", "code" => 400];
                    }
                }



            }catch(Exception $error){

            }
        } else if($method == "POST"){
            try{
                if(!isset($input["userId"]) && !isset($input["calId"])){
                    return ["error" => "Attributes missing", "code" => 400];
                } else {
                    return pinnedCalendarsPost($input);
                }
            
            }catch(Exception $error){

            }

        } else if($mehod == "PATCH"){
            try{
                if(!isset($input["id"])){
                    return ["error" => "Missing attributes", "code" => 400];
                } else if(!$input > 1){
                    return ["error" => "Missing attributes", "code" => 400];
                } else {
                    return pinnedCalendarsPatch($input);
                }


            } catch(Exception $error){

            }
        } else if($method == "DELETE"){
            try{
                if(!isset($input["id"]) && $isset($input["userId"]) && !isset($input["calId"])){
                    return ["error" => "Missing attributes", "code" => 400];
                } else {
                    return pinnedCalendarsDelete($input);
                }
            } catch(Exception $error){

            }
        }


    }





}




?>