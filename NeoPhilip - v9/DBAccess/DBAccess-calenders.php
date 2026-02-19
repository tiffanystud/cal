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
        return postCalender();
    } else {
        return ["error" => "Attributes missing", "code" => 400];
    }
}

function PATCH($input){
    if(isset($input["id"])){
        $data = [];
        $data["id"] = $input["id"];
        if(isset($input["name"])){
            $data["name"] = $input["name"];
        } else if(isset($input["type"])){
            $data["type"] = $input["type"];
        } else {
            return ["error" => "Attributes are missing", "code" => 400];
        }
        return patchCalender($data);
    } else {
        return ["error" => "Id is missing", "code" => 400];
    }
}

function DELETE($input){
    if(isset($input["id"]) && isset($input["creatorId"])){
        return deleteCalender($input);
    } else {
        return ["error" => "Attributes are missing", "code" => 400];
    }
}

