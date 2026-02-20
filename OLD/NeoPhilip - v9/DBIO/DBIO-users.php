<?php

function getAll(){

}

function getUserById($input){
    // $userTable = readDb()["users"];
    $db = readDb();

    $user = array_find($db["users"], fn($user) => $user["id"] == $input["id"]);

    if($user){
        return $user;
    } else {
        return ["error" => "User not found", "code" => 400];
    }

}

function postUser($input){
    $db = readTable();

    $user = array_find($db["users"], fn($user) => $user["id"] == $input["id"]);

    if(!$user){
        array_push($db["user"], $input);
        writeToDb($db);
        // Returns the created user
        return $input;
    } else {
        return ["error" => "User already exists", "code" => 400];
    }

}

function patchUser($input){
    $db = readTable();

    $userArray = array_find($db["users"], fn($user) => $user["id"] == $input["id"]);

    if(!$userArray){
        return ["error" => "Cant find user by id", "code" => 406];
    }

    $sameValues = [];

    foreach($userArray as $userKey => &$user){
        foreach($input as $valueKey => $value){
            if($valueKey != "id"){
                if($user[$valueKey] == $value){
                    // Kollar om det redan stämmer, då skickas error att det inte kan ändra den
                    array_push($sameValues, $valueKey);
                    continue;
                } else{
                    $user[$valueKey] = $value;
                }
            }
        }
    }

    if(!empty($sameValues)){
        // Returnera objekt och eller 200 meddelande med status osv
        return $input;
    } else {
        return ["error" => implode(" ", $sameValues) . " already set", "code" => 406];
    }
}

function deleteUser($input){

}