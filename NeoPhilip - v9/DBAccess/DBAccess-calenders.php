<?php

require_once "./DBIO-calenders.php";

function calenderHandler($method, $input){
    return $method($input);
}

function GET($input){
    if(isset($input["id"])){
        return getCalenderById($input);
    } else {
        return getAll();
    }
}

function POST($input){
    if(isset($input["creatorId"]) && isset($input["name"]) && isset($input["type"])){
        return postCalender($input);
    } else {
        return ["error" => "Attributes missing", "code" => 400];
    }
}

function PATCH($input){
    if(isset($input["id"])){
        if(isset($input["name"])){
            return patchCalender(["id" => $input["id"], "name" => $input["name"]]);
        } else if(isset($input["type"])){
            return patchCalender(["id" => $input["id"], "type" => $input["type"]]);
        } else {
            return ["error" => "Attributes are missing", "code" => 400];
        }
    } else {
        return ["error" => "Id is missing", "code" => 400];
    }
}

function DELETE($input){
    if(isset($input["id"])){
        return deleteCalender($input);
    } else {
        return ["error" => "Attributes are missing", "code" => 400];
    }
}

