<?php
require_once "DBIO.php";

class DBAccess {
    public static function defaultResp($message) {
        http_response_code(400);
        return ["error" => $message];
    }

    public static function getHandler() {

        $url = $_SERVER["REQUEST_URI"];
        $db = DBIO::readDb();

        if ($url === "/users") {
            return $db["users"];

        } else if ($url === "/groups") {
            return $db["groups"];

        } else if ($url === "/users_groups") {
            return $db["users_groups"];

        } else {
            return self::defaultResp("Bad request");
        }
    }

    public static function postHandler($input) {

        $url = $_SERVER["REQUEST_URI"];
        $db = DBIO::readDb();

        // POST: /users
        if ($url == "/users") {

            // Chech attributes
            if (!isset($input["userName"]) or !isset($input["pwd"]) or !isset($input["email"])) {
                return self::defaultResp("Attributes missing");
            }

            $ids = array_column($db["users"], "id");
            $maxID = max($ids);
            $input["id"] = $maxID + 1;
            
            // Add new user
            array_push($db["users"], $input);
            DBIO::writeToDb($db);
            
            return $input;

        // POST: /groups
        } else if ($url === "/groups") {
            
            if (!isset($input["name"])) {
                return self::defaultResp("Attributes missing");
            }

            $ids = array_column($db["groups"], "id");
            $maxID = max($ids);
            $input["id"] = $maxID + 1;
            
            // Add new group
            array_push($db["groups"], $input);
            DBIO::writeToDb($db);
            return $input;
            
        // POST: /user_groups
        } else if ($url === "/users_groups") {
            
            if (!isset($input["userID"]) or !isset($input["groupID"])) {
                return self::defaultResp("Attributes missing");
            }

            

        } else {
            
            return self::defaultResp("Bad request");
            
        }
    }
    public static function patchHandler($input) {
        $url = $_SERVER["REQUEST_URI"];
        $db = DBIO::readDB();
        if($url === "/users") {
            if(!isset($))


            
        } else if($url === "/groups") {
            //
        } else if($url == "/users_groups") {

        } else {
            return self::defaultResp("Attribute missing");
        }
    }
}