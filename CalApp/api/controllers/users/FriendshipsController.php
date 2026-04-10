<?php

require_once __DIR__ . "/../../services/FriendshipsService.php";

class FriendshipsController{

    public static function handle($method, $input): void {
        try{
            if($method === "GET"){

                if (isset($_GET["userId1"], $_GET["userId2"])){
                    $result = FriendshipsService::getFriendship($_GET["userId1"], $_GET["userId2"]);
                    self::json($result, 200);
                }
                $userId = $_GET["userId"] ?? null;
                if (!$userId){
                    throw new Exception("User ID missing", 400);
                }
                // /friendships?userId=id
                $result = FriendshipsService::getAllFriendsByUser($userId);
                self::json($result, 200);
                return;

            } 
        //friendships?userId=id
            if ($method === "POST"){
                $userId = $input["userId1"] ?? null;
                $friendId = $input["userId2"] ?? null;
                if(!$userId || !$friendId){
                    throw new Exception("Missing attributes", 400);
                }
                $result = FriendshipsService::newFriend($userId, $friendId);
                self::json($result, 201);
                return;

            }
            // /friendships?userId=id&userId2=id
            if ($method === "DELETE") {
                $id1 = $input["userId1"] ?? null;
                $id2 = $input["userId2"] ?? null;

                if (!$id1 || !$id2){
                    throw new Exception("Missing attributes", 400);
                }
                $result = FriendshipsService::deleteFriend($id1, $id2);
                self::json($result, 200);
                return;
            }
        } catch (Exception $exc) {
            $code = $exc->getCode() ?:400;
            self::json(["error" => $exc->getMessage()], $code);
            return;
        }


    }

    private static function json($data, $status){
        http_response_code($status);
        header("Content-Type: application/json");
        echo json_encode($data);
        exit;
    }

}
?>