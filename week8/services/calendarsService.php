<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class CalendarsService{

    public static function calendarsGetAll(){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        if(empty($calendarTable)){
            throw new Exception("No calendars found");
        } else {
            return $calendarTable;
        }
    }

    public static function calendarsGetById($input){
        $db = new DBAccess("calendars");
        $calendarTableById = $db->findById($input["id"]);

        if(empty($calendarTableById)){
            throw new Exception("No calendars found by id");
        } else {
            return $calendarTableById;
        }
    }

    public static function calendarsPost($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        if($input["type"] != "public" && $input["type"] != "private"){
            throw new Invalid("Invalid group type");
        }
        
        foreach($calendarTable as $cals){
            if($input["creatorId"] == $cals["creatorId"]){
                if($input["name"] == $cals["name"]){
                    throw new AlreadyInGroup("User is already in group with same name");
                }
            }
        }
       
        $newData = [
            "id" => uniqid(),
            "creatorId" => $input["creatorId"],
            "name" => $input["name"],
            "type" => $input["type"]
        ];
        return $db->postData($newData);
        
    }

    public static function calendarsPatch($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll(); 

        $changeData = [];
        foreach($input as $key => $data){
            if($key != "id"){
                $changeData[$key] = $data;
            }
        }
        if(!count($changeData) > 1){
            throw new Exception("No values to be changed");
        } else {
            return $db->patchData($input["id"], $changeData);
        }

    }

    public static function calendarsDelete($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        $checkCal = false;

        foreach($calendarTable as $cal){
            if($input["id"] == $cal["id"]){
                $checkCal = true;
                break;
            }
        }
        
        if($checkCal){
            return $db->deleteData($input["id"]);
        } else {
            throw new Exception("No calendar exists to delete");
        }
    }




    
}




?>