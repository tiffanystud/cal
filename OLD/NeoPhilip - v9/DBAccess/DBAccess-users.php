<?php

require_once "../DBIO/DBIO-users.php";

function usersHandler($method, $input, $url ){
    return $method($input, $url);
}

function GET($input){
    if(isset($input["id"])){
        return getUserById($input);
    } else {
        return getAll();
    }
}

function POST($input){
    if(isset($input["name"]) && isset($input["email"]) && isset($input["password"])){
        return postUser();
    } else {
        return ["data" => ["error" => "Attributes are missing"], "code" => 400];
    }
}

function PATCH($input){
    if(isset($input["id"])){
        $data = [];
        $data["id"] = $input["id"];
        if(isset($input["name"])){
            $data["name"] = $input["name"];
        } else if(isset($input["password"])){
            $data["password"] = $input["password"];
        } else if(isset($input["email"])){
            $data["email"] = $input["email"];
        } else {
            return ["data" => ["error" => "Attributes are missing"], "code" => 400];
        }
        return patchUser($data);
    } else {
        return ["data" => ["error" => "Id is missing"], "code" => 400];
    }
}

function DELETE($input){
    if(isset($input["id"]) && isset($input["password"])){
        return deleteUser($input);
    } else {
        return ["data" => ["error" => "Attributes are missing"], "code" => 400];
    }
}