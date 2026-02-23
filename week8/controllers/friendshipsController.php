<?php

require_once __DIR__ . "/../services/FriendshipsService.php";

class FriendshipsController{

    public static function handle($method, $input): void {

        if($method === "GET"){
            try {
                $id1 = $_GET["userId"] ?? null;
                $id2 = $_GET["userId2"] ?? null;
                
                if ($id1 && $id2) {
                    // /friendships?userId=id&userId2=id
                    $result = FriendshipsService::getFriend($id1, $id2);
                } elseif ($id1) {
                    // /friendships?userId=id
                    $result = FriendshipsService::getAllFriends($id1);
                } else {
                    //error
                }
                //<--------- HITTEPÅ-funktion
                sendSuccessMsg($result /*Status*/);

            } catch (Exception $exc){
                //<--------- HITTEPÅ-funktion
                sendErrorMsg($exc);

            }
        }
        //friendships?userId=id
        if ($method === "POST"){
            try {
                $id = $_GET["userId"] ?? null;

                if($id) {
                    $result = FriendshipsService::newFriend($id);
                }
                //<--------- HITTEPÅ-funktion
                sendSuccessMsg($result/*Status*/);
            } catch (Exception $exc){
                //<--------- HITTEPÅ-funktion
                sendErrorMsg($exc);
            }
        }
        // /friendships?userId=id&userId2=id
        if ($method === "DELETE") {
            try {
                $id1 = $_GET["userId1"] ?? null;
                $id2 = $_GET["userId2"] ?? null;

                if ($id1 && $id2){
                    $result = FriendshipsService::deleteFriend($id1, $id2)
                    sendSuccessMsg($result /*Status*/)
                } elseif {
                    
                }


            }
        }

    }

}
?>