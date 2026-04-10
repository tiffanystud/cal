<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class CalendarsMSGService
{
    /* ---- GET ---- */
    public static function getByParams($input)
    {
        $senderId = $input["senderId"] ?? null;
        $calId = $input["calId"] ?? null;

        if (!isset($calId)) {
            throw new Exception("Missing attributes");
        }

        $db = new DBAccess("calendar_msg");
        $items = $db->getAll();
        $filtered;
        if ($senderId && $calId) {
            $filtered = array_values(array_filter($items, fn($x) => $x["calId"] === $calId && $x["senderId"] === $senderId));
        } else if ($calId) {
            $filtered = array_values(array_filter($items, fn($x) => $x["calId"] === $calId));
        }

        if (count($filtered) === 0) {
            throw new Exception("Messages not found");
        }

        return $filtered;
    }

    /* --- POST ---- */
    public static function post($input) {
        $senderId = $input["senderId"] ?? null;
        $calId = $input["calId"] ?? null;
        $content = $input["content"] ?? null;

        if (!isset($senderId, $calId, $content)) {
            throw new Exception("Missing attributes");
        }

        $dbCals = new DBAccess("calendars");
        $itemsCals = $dbCals->getAll();

        $foundCalendar = $dbCals->findById($calId);
        if (!$foundCalendar) throw new Exception("Invalid calendar");
        

        // Create new MSG
        $date = date("Y-m-d");
        $time = date("H:i:s");

        $newMSG = [
            "id" => uniqid(),
            "senderId" => $senderId,
            "calId" => $calId,
            "date" => $date,
            "time" => $time,
            "content" => $content,
            "hasChanged" => false
        ];

        $dbCalMsg = new DBAccess("calendar_msg");
        return $dbCalMsg->postData($newMSG);
    }



    /* --- PATCH ---- */
    public static function patch($input) {

        $id = $input["id"] ?? null;
        $content = $input["content"] ?? null;

        if (!isset($id, $content)) {
            throw new Exception("Missing attributes");
        }

        $db = new DBAccess("calendar_msg");
        $items = $db->getAll();

        foreach ($items as $currItem) {
            if ($currItem["id"] == $id) {

                $changes = ["content" => $content, "hasChanged" => true];

                return $db->patchData($currItem["id"], $changes);
            }
        }
        throw new Exception("Message not found");
    }


    /* --- DELETE ---- */
    public static function delete($input)
    {

        $id = $input["id"] ?? null;

        if (!isset($id)) {
            throw new Exception("Missing attributes");
        }

        $db = new DBAccess("calendar_msg");
        $connection = $db->findById($id);

        if (!$connection) throw new Exception("Message not found");

        return $db->deleteData($id);
    }

}