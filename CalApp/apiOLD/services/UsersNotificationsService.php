<?php
require_once "repository/DBAccess.php";

class UsersNotificationsService {
    //GET
    public static function getAll() {
        $db = new DBAccess("users_notifications");
        return $db->getAll();
    }

    public static function getByParams($userId, $notiId) {
        $db = new DBAccess("users_notifications");

        if ($userId && $notiId) {
            return array_find($db->getAll(), fn($x) => $x["userId"] === $userId && $x["notiId"] === $notiId);
        } else if ($userId) {
            return array_values(array_filter($db->getAll(), fn($x) => $x["userId"] === $userId));
        } else if ($notiId) {
            return array_values(array_filter($db->getAll(), fn($x) => $x["notiId"] === $notiId));
        }
    }

    //POST
    public static function postUserNoti($input) {
        $userId = $input["userId"] ?? null;
        $notiId = $input["notiId"] ?? null;

        if (!$userId || !$notiId) {
            throw new Exception("Missing attributes");
        }

        $db = new DBAccess("users_notifications");
        $usersDb = new DBAccess("users");
        $notiDb = new DBAccess("notifications");

        if (!array_find($usersDb->getAll(), fn($x) => $x["id"] === $userId) || !array_find($notiDb->getAll(), fn($x) => $x["id"] === $notiId)) {
            throw new Exception("Not found");
        }

        if (array_find($db->getAll(), fn($x) => $x["userId"] === $userId && $x["notiId"] === $notiId)) {
            throw new Exception("Conflict");
        }

        return $db->postData([
            "id" => uniqid(),
            "userId" => $userId,
            "notiId" => $notiId
        ]);
    }

    public static function deleteUserNoti($input) {
        $userId = $input["userId"] ?? null;
        $notiId = $input["notiId"] ?? null;
        $db = new DBAccess("users_notifications");

        if (!$userId || !$notiId) {
            throw new Exception("Missing attributes");
        } 

        if ($notiId && $userId) {
            $connection = array_find($db->getAll(), fn($x) => $x["userId"] === $userId && $x["notiId"] === $notiId);
            if (!$connection) {
                throw new Exception("Not found");
            }

            $db->deleteData($connection["id"]);
            return ["success" => "Connection deleted"];
        } else if ($userId) {
            $userNotis = array_values(array_filter($db->getAll(), fn($x) => $x["userId"] === $userId));
            foreach($userNotis as $userNoti) {
                $db->deleteData($userNoti["id"]);
            }
            return ["success" => "Connections deleted"];
        } 
    }
}