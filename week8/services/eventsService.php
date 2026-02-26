<?php

require_once "repository/DBAccess.php";

class EventsService {
    //GET-metoder
    public static function getAllEvents() {
        $db = new DBAccess("events");
        return $db->getAll();
    }

    public static function getEventById($id) {
        $db = new DBAccess("events");
        $event = $db->findById($id);

        if (!$event) {
            throw new Exception("Event not found");
        } else {
            return $event;
        }
    }

    public static function getEventsCal($cal) {
        $db = new DBAccess("events");
        $events = $db->getAll();
        $eventsByCal = array_filter($events, fn($x) => $x["calId"] === $cal);
        if (count($eventsByCal) === 0) {
            throw new Exception("No events found");
        } else {
            return $eventsByCal;
        }
    }

    //POST-metoder
    public static function createNewEvent($input) {
        // $userId = $input["userId"] ?? null; för kontroll om behörighet
        $type = $input["type"] ?? null;
        $name = $input["name"] ?? null;
        $desc = $input["description"] ?? null;
        $location = $input["location"] ?? null;
        $conf = $input["needsConfirmation"] ?? null;
        $pLimit = $input["participationLimits"] ?? null;
        $tags = $input["tags"] ?? null;
        $calId = $input["calId"] ?? null;

        if (!$type || !$name || !$location || $conf === null || !$calId) {
            throw new Exception("Missing attributes");
        }

        $cals = new DBAccess("calendars");
        $allCals = $cals->getAll();
        $cal = array_find($allCals, fn($x) => $x["id"] === $calId);
        //Här skall även userId behandlas, kolla om user finns
        if (!$cal) {
            throw new Exception("Cal not found");
        }

        //userId ska även senare kollas om den är admin i den specificerade calId
        //Kasta exception om inte
        if ($desc === null) {
            $desc === "No description";
        }
        $newEvent = [
            "id" => uniqid(),
            "type" => $type,
            "name" => $name,
            "description" => $desc,
            "location" => $location,
            "needsConfirmation" => $conf,
            "participationLimits" => $pLimit,
            "tags" => $tags,
            "calId" => $calId
        ];

        $eventsDb = new DBAccess("events");
        return $eventsDb->postData($newEvent);
    }

    //PATCH-metoder
    public static function patchEvent($input) {
        // $userId = $input["userId"] ?? null; för att kolla behörighet
        $eventId = $input["eventId"] ?? null;
        $calId = $input["calId"] ?? null;
        $type = $input["type"] ?? null;
        $name = $input["name"] ?? null;
        $desc = $input["description"] ?? null;
        $location = $input["location"] ?? null;
        $conf = $input["needsConfirmation"] ?? null;
        $pLimit = $input["participationLimits"] ?? null;
        $tags = $input["tags"] ?? null;

        if (!$eventId || !$calId) {
            throw new Exception("Missing attributes");
        }

        $events = new DBAccess("events");
        $cals = new DBAccess("calendars");
        $event = array_find($events->getAll(), fn($x) => $x["id"] === $eventId);
        $cal = array_find($cals->getAll(), fn($x) => $x["id"] === $calId);

        if (!$event || !$cal) {
            throw new Exception("Not found");
        }

        $patchAttributes = [
            "type" => $type,
            "name" => $name,
            "description" => $desc,
            "location" => $location,
            "needsConfirmation" => $conf,
            "participationLimit" => $pLimit,
            "tags" => $tags
        ];
        $patchBody = [];

        foreach($patchAttributes as $att => $value) {
            if ($value !== null) {
                $patchBody[$att] = $value;
            }
        }

        if (count($patchBody) === 0) {
            throw new Exception("Missing attributes");
        }

        return $events->patchData($eventId, $patchBody);
    }

    //DELETE-metoder
    public static function deleteEvent($input) {
        // $userId = $input["userId"] ?? null; för koll om behörighet
        $calId = $input["calId"] ?? null;
        $eventId = $input["eventId"] ?? null;

        if (!$calId || !$eventId) {
            throw new Exception("Missing attributes");
        }
        
        $events = new DBAccess("events");
        $cals = new DBAccess("calendars");
        $event = array_find($events->getAll(), fn($x) => $x["id"] === $eventId);
        $cal = array_find($cals->getAll(), fn($x) => $x["id"] === $calId);

        if (!$event || !$cal) {
            throw new Exception("Not found");
        }

        $events->deleteData($eventId);
        return ["success" => "Event deleted successfully"];
    } 
 }

?>