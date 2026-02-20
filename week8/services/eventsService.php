<?php

require_once "../repository/DBAccess.php";

 class EventsService {
    //GET metoder
    public static function getEventById($id) {
        $event = DBAccess->getById($id);

        if (!$event) {
            throw new Exception("Event not found");
        } else {
            return $event;
        }
    }

    public static function getEventByUserAndCal($obj) {
        $user = 
    }
 }

?>