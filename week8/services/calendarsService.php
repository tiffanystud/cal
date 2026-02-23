<?php

class CalendarsService{

    public static function calendarsGetAll(){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        if(empty($calendarTable)){
            throw new emptyCalendars("No calendars found");
        } else {
            return $calendarTable;
        }
    }

    public static function calendersGetById($input){
        $db = new DBAccess("calendars");
        $calendarTableById = $db->findById($input["id"]);

        if(empty($calendarTableById)){
            throw new emptyCalenders("No calendars found by id");
        } else {
            return $calendarTableById;
        }
    }

    public static function calendarsPost($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();
        $userGroupDb = new DBAccess("calendars");
        $userGroupTable = $db->getAll();
        // Vi måste även kolla all innehåll input, alltså sträng karaktärer osv.
        // Här måste vi kolla om skaparen av gruppen redan är mer i en grupp som hen skapar, vi måste då göra en request till user_groups här

        //curl_init: Skapar requesten med url 
        // $request = curl_init("localhost:8000/user_calenders?userId={$calenderTable['creatorId']}");
        // //curl_setopt: Ställer in options i requesten, det kan vara metod, headers, body, osv, vad som ställs in för requesten
        // curl_setopt($request, CURL_RETURNTRANSFER, true);
        // //curl_exec: Skickar requesten och tar emot svar
        // $response = curl_exec($request);
        // //curl_close: Stänger anslutningen och frigör minnet
        // curl_close($request);
        
        foreach($userGroupTable as $userCals){
            foreach($calendarTable as $cal){
                if($userCals["calID"] == $cal["id"]){
                    if($cal["name"] == $input["name"]){
                        throw new Exception("You have already created calendar as the given name");
                    } else {
                        return $db->postData($input);
                    }
                }
            }
        }
        
    }

    public static function calendarsPatch($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll(); 

        // $request = curl_init("localhost:8000/user_calenders?userId={$calenderTable['creatorId']}");
        // //curl_setopt: Ställer in options i requesten, det kan vara metod, headers, body, osv, vad som ställs in för requesten
        // curl_setopt($request, CURL_RETURNTRANSFER, true);
        // //curl_exec: Skickar requesten och tar emot svar
        // $response = curl_exec($request);
        // //curl_close: Stänger anslutningen och frigör minnet
        // curl_close($request);

        // if($request["userId"] != $loggedInId){
        //     throw new Exception("User is not creator of group and hasnt got permision to change");
        // } else {
        $changeData = [];
        foreach($input as $key => $data){
            if($key != "id"){
                array_push($changeData, $data);
            }
        }
        if(!count($changeData) > 1){
            throw new Exception("No values to be changed");
        } else {
            return $db->patchData($input["id"], $changeData);
        }

    }

    public static function calendarDelete($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        // $request = curl_init("localhost:8000/user_calenders?userId={$calenderTable['creatorId']}");
        // //curl_setopt: Ställer in options i requesten, det kan vara metod, headers, body, osv, vad som ställs in för requesten
        // curl_setopt($request, CURL_RETURNTRANSFER, true);
        // //curl_exec: Skickar requesten och tar emot svar
        // $response = curl_exec($request);
        // //curl_close: Stänger anslutningen och frigör minnet
        // curl_close($request);

        // Vi får typ ha en till kontroll och request som kollar om creatorId och id i UserGroups matchar den som är inloggad som ska ta bort gruppen

        // if($input["creatorId"] == userLoggedInId) som exempel typ så eller göra en request til vem som är inloggad typ


        if(!$input["id"] > 1){
            throw Exception("Userid has to be positive");
        } else {
            $db->deleteData($input["id"]);
        }


    }




    
}




?>