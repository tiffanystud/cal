<?php

class PinnedCalendarsService{

    public static function pinnedCalendarsGetAll(){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();

        if(empty($pinnedCalendarTable)){
            throw new Exception("No calendars found");
        } else {
            return $pinnedCalendarTable;
        }

    }

    public static function pinnedCalendarsGetById($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->findById($input["userId"]);

        if(empty($pinnedCalendarTable)){
            throw new emptyCalenders("No calendars found by userId");
        } else {
            return $pinnedCalendarTable;
        }
    }

    public static function pinnedCalendarsPost($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();

        foreach($pinnedCalendarTable as $table){
            if($table["calId"] == $input["calId"]){
                throw new Excpetion("Calendar already exists");
            }
        }

        return $db->postData($input);
    }

    public static function pinnedCalendarsPatch($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();

        $changeData = [];
        foreach($input as $key => $data){
            if($key != "id"){
                array_push($changeData, $data[$key]);
            }
        }
        if(!count($changeData) > 1){
            throw new Exception("No values to be changed");
        } else {
            return $db->patchData($input["id"], $changeData);
        }
    }

    public static function pinnedCalendarsDelete($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();

        if(!$input["id"] > 1){
            throw Exception("Id has to be positive");
        } else {
            $db->deleteData($input["id"]);
        }

    }



    

}




?>