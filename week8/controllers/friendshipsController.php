<?php

require_once __DIR__ . "/../services/friendshipsService.php";

class FriendshipsController{

    public static function handle($method, $input): void {

        if($method === "GET"){
            try {
                $id1 = $_GET["userId"] ?? null;
                $id2 = $_GET["userId2"] ?? null;

                if ($id1 && $id2) {
                    $result = FriendshipsService::getFriend();
                } elseif ($id1) {
                    $result = FriendshipsService::getAllFriends();
                }
                //Gör funktion som skickar meddelande.
                sendSuccessMsg($result /*Status*/);

            } catch (Exception $exc){
                sendErrorMsg($exc);

            }
        }

        if ($method === "POST"){
            try {
                $id = $_GET["userId"] ?? null;

                if($id) {
                    $result = FriendshipsService::newFriend();
                }
                sendSuccessMsg($result/*Status*/);
            } catch (Exception $exc){
                sendErrorMsg($exc);
            }
        }

        if ($method === "PATCH") {

        }

    }

}
?>