<?php

require_once "repository/DBAccess.php";

class EventAdminsService {
    //GET-metoder
    public static function getAll() {
        $eventAdmins = new DBAccess("events_admins");
        return $eventAdmins->getAll();
    }

    public static function getByParams($obj) {
        $userId = $obj["userId"] ?? null;
        $eventId = $obj["eventId"] ?? null;
        $eventAdmins = new DBAccess("events_admins");

        if ($userId && $eventId) {
            $eventAdmin = array_find($eventAdmins->getAll(), fn($x) => $x["eventId"] === $eventId && $x["userId"] === $userId);
            if (!$eventAdmin) {
                throw new Exception("Not found");
            } else {
                return $eventAdmin;
            }
        } else if ($userId) {
            $result = array_values(array_filter($eventAdmins->getAll(), fn($x) => $x["userId"] === $userId));
            if (count($result) === 0) {
                throw new Exception("Not found");
            } else {
                return $result;
            }
        } else if ($eventId) {
            $result = array_values(array_filter($eventAdmins->getAll(), fn($x) => $x["eventId"] === $eventId));
            if (count($result) === 0) {
                throw new Exception("Not found");
            } else {
                return $result;
            }
        }
    }

    //POST-metoder
    public static function post($input) {
        // $sessionId = $input["sessionId"] ?? null; för att kolla behörighet
        $userId = $input["userId"] ?? null;
        $eventId = $input["eventId"] ?? null;
        $canDelete = $input["canDelete"] ?? null;
        $canEdit = $input["canEdit"] ?? null;
        $isCreator = $input["isCreator"] ?? null;

        if (!$userId || !$eventId || $canDelete === null || $canEdit === null || $isCreator === null) {
            throw new Exception("Missing attributes");
        }

        $events = new DBAccess("events");
        $users = new DBAccess("users");
        $event = $events->findById($eventId);
        $user = $users->findById($userId);

        if (!$event || !$user) {
            throw new Exception("Not found");
        }

        $newConnection = [
            "id" => uniqid(),
            "userId" => $userId,
            "eventId" => $eventId,
            "canDelete" => $canDelete,
            "canEdit" => $canEdit,
            "isCreator" => $isCreator
        ];

        $eventAdmins = new DBAccess("events_admins");
        return $eventAdmins->postData($newConnection);
    }

    //PATCH-metoder
    public static function patch($input) {
        // $sessionId = $input["sessionId"] ?? null; för koll om behörighet
        $userId = $input["userId"] ?? null;
        $eventId = $input["eventId"] ?? null;
        $canDelete = $input["canDelete"] ?? null;
        $canEdit = $input["canEdit"] ?? null;
        $isCreator = $input["isCreator"] ?? null;

        if (!$userId || !$eventId) {
            throw new Exception("Missing attributes");
        }

        $events = new DBAccess("events");
        $users = new DBAccess("users");
        $event = $events->findById($eventId);
        $user = $users->findById($userId);

        if (!$event || !$user) {
            throw new Exception("Not found");
        }

        $patchAttributes = [
            "canDelete" => $canDelete,
            "canEdit" => $canEdit,
            "isCreator" => $isCreator
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

        $eventAdmins = new DBAccess("events_admins");
        $eventAdmin = array_find($eventAdmins->getAll(), fn($x) => $x["userId"] === $userId && $x["eventId"] === $eventId);
        if (!$eventAdmin) {
            throw new Exception("Not found");
        }
        return $eventAdmins->patchData($eventAdmin["id"], $patchBody);
    }

    //DELETE-metoder
    public static function delete($input) {
        // $sessionId = $input["sessionId"] ?? null; för koll om behörighet
        $userId = $input["userId"] ?? null;
        $eventId = $input["eventId"] ?? null;

        if (!$userId || !$eventId) {
            throw new Exception("Missing attributes");
        }

        $eventAdmins = new DBAccess("events_admins");
        $eventAdmin = array_find($eventAdmins->getAll(), fn($x) => $x["userId"] === $userId && $x["eventId"] === $eventId);
        if (!$eventAdmin) {
            throw new Exception("Not found");
        }

        $eventAdmins->deleteData($eventAdmin["id"]);
        return ["success" => "Connection successfully deleted"];
    }
}

?>