<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class FriendshipsService{

    public static function getAllFriendsByUser($userId){
        $usersDb = new DBAccess("users");
        $friendsDb = new DBAccess("friendships");

        if (!$usersDb->findById($userId)) {
            throw new Exception("User not found: $userId", 404);
        }
        $relations = $friendsDb->getAll();
        $friendsIds = [];
        foreach ($relations as $r) {
            if ($r["userId1"] == $userId){
                $friendsIds[] = $r["userId2"];
            } elseif ($r["userId2"] == $userId){
                $friendsIds[] = $r["userId1"];
            }
        }

        $friends = [];
        foreach ($friendsIds as $fId){
            $friend = $usersDb->findById($fId);
            if ($friend) {
                $friends[] = [
                    "id" => $friend["id"],
                    "name" => $friend["name"]
                ];
            }
        }
        return $friends;
    }

    public static function getFriendship($id1, $id2){
        if (!$userId1 || !$userId2) {
            throw new Exception("Missing parameters", 400);
        }
        $friendsDb = new DBAccess("friendships");
        $relations = $friendsDb->getAll();

        foreach ($relations as $rel) {
            if (
                ($rel["userId1"] == $userId1 && $rel["userId2"] == $userId2) ||
                ($rel["userId1"] == $userId2 && $rel["userId2"] == $userId1)
            ) {
                return $rel;
            }
        }
        throw new Exception("Friendship not found", 404);
    }

    public static function newFriend($id1, $id2){
        $frDb = new DBAccess("friendships");
        $usersDb = new DBAccess("users");

        if(!$usersDb->findById($id1) || !$usersDb->findById($id2)) {
            throw new Exception("User not found!", 404);
        }
        $relations = $frDb->getAll();

        foreach ($relations as $rel) {
            if (
                ($rel["userId1"] == $id1 && $rel["userId2"] == $id2) ||
                ($rel["userId1"] == $id2 && $rel["userId2"] == $id1)
            ) {
                throw new Exception("Friend invitation already sent");
            }
        }
        $newRel = [
            "id" => uniqid(),
            "userId1" => $id1,
            "userId2" => $id2
        ];
        $res = $frDb->postData($newRel);
        return $res;
        
    }

    public static function deleteFriend($id1, $id2)
    {
        if (!isset($id2)) {
            throw new Exception("Missing friendId", 400);
        }

        $friendsDb = new DBAccess("friendships");

        $relations = $friendsDb->getAll();

        foreach ($relations as $rel) {
            if (
                $rel["userId1"] == $id1 &&
                $rel["userId2"] == $id2
            ) {
                $friendsDb->deleteData($rel["id"]);
                return ["message"=>"Deleted successfully!"];
            }
        }

        throw new Exception("User not found", 404);
    }
}



?>