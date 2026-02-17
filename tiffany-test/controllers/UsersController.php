<?php
class UsersController {

    public static function handle($method, $input){
        if ($method === "GET") {
            if(!$input["userId"] > 1){
                 // Anropa någon error funktion
            } else if(empty(input["userName"])){
                  // Anropa någon error funktion
            } else if(!strlen($input["password"] > 5)){
                 // Anropa någon error funktion
            } else if(!str_contains($input["email"], "@")){
                  // Anropa någon error funktion
            }
            return UsersService::getAllUsers();
        }
        
        if ($method === "POST") {
            if(!is_numeric($input["userId"])){
                // Anropa någon error funktion
            } else if(!ctype_upper($input["userName"][0])){
                // Anropa någon error funktion
            } else if(!str_contains($input["password"], "%") && !strlen($input["password"] > 5)){
                  // Anropa någon error funktion
            } else if(!str_contains($input["email"], "@")){
                 // Anropa någon error funktion
            }
            return UsersService::getAllUsers(); 
        }

        if ($method === "PATCH") {
            /* return UsersService::getAllUsers(); */
        }

        if ($method === "DELETE") {
           
        }

    }
}