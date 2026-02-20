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

    $user = array_find($db, fn($user) => $user["id"] == $input["id"]);

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

}

function deleteUser($input){

}