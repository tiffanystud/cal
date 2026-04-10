<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class CalendarsMSGService
{
    /* ---- GET ---- */
    public static function getById($input)
    {
        $senderId = $input["senderId"] ?? null;
        $calId = $input["calId"] ?? null;

        if (!isset($calId)) {
            throw new Exception("Missing attributes");
        }

        $db = new DBAccess("calendar_msg");
        $items = $db->getAll();

        $filtered = [];

        foreach ($items as $currItem) {

            if ($currItem["calId"] != $calId) {
                continue;
            }

            if ($senderId !== null && $currItem["senderId"] != $senderId) {
                continue;
            }

            $filtered[] = $currItem;
        }

        if (!$filtered) {
            throw new Exception("Messages not found");
        }

        return json_decode(json_encode($filtered), true);
    }

    /* --- POST ---- */
    public static function create($input)
    {

        $senderId = $input["senderId"] ?? null;
        $calId = $input["calId"] ?? null;
        $content = $input["content"] ?? null;

        if (!isset($senderId, $calId, $content)) {
            throw new Exception("Missing attributes");
        }

        $dbCals = new DBAccess("calendars");
        $itemsCals = $dbCals->getAll();

        $foundCalendar = false;
        // Does calendar exist
        foreach ($itemsCals as $currItem) {
            if ($currItem["id"] == $calId) {
                $foundCalendar = true;
            }
        }

        if ($foundCalendar == false) {
            throw new Exception("Invalid calendar");
        }

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

        // New item returned
        $result = $dbCalMsg->postData($newMSG);
        return $result;

    }



    /* --- PATCH ---- */
    public static function update($input)
    {

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

                // Updated item
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
        $items = $db->getAll();

        foreach ($items as $currItem) {
            if (
                $currItem["id"] == $id
            ) {
                // Returns deleted item
                return $db->deleteData($id);
            }
        }

        throw new Exception("Message not found");

    }

}