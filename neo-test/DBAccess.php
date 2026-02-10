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

        if ($url == "/users") {
            if (!isset($input["userName"]) or !isset($input["pwd"]) or !isset($input["email"])) {
                return self::defaultResp("Attributes missing");
            }

            $ids = array_column($db["users"], "id");
            $maxID = max($ids);
            $input["id"] = $maxID + 1;
            array_push($db["users"], $input);
            DBIO::writeToDb($db);
            return $input;
        } else if ($url === "/groups") {
            if (!isset($input["name"])) {
                return self::defaultResp("Attributes missing");
            }

            $ids = array_column($db["groups"], "id");
            $maxID = max($ids);
            $input["id"] = $maxID + 1;
            array_push($db["groups"], $input);
            DBIO::writeToDb($db);
            return $input;
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
            if (!isset($input["id"])) {
                return self::defaultResp("Attributes missing");
            } else if(!isset($input["userName"]) && !isset($input["pwd"]) && !isset($input["email"])) {
                return self::defaultResp("Attributes missing");
            }

            $id = $input["id"];
            $userName;
            $pwd;
            $email;

            if(isset($input["userName"])) {
                $userName = $input["userName"];
            } else {
                $userName = null;
            }
            if(isset($input["pwd"])) {
                $pwd = $input["pwd"];
            } else {
                $pwd = null;
            }
            if(isset($input["email"])) {
                $email = $input["email"];
            } else {
                $email = null;
            }

            $userFound = false;

            foreach ($db["users"] as &$user) {
                if($user["id"] === $id) {
                    $userFound = true;
                    if(($userName !== null)) {
                        $user["userName"] = $userName;
                    }
                    if(($pwd !== null)) {
                        $user["pwd"] = $pwd;
                    }
                    if(($email !== null)) {
                        $user["email"] = $email;
                    }

                    DBIO::writeToDb($db);
                    return $user;
                }
            }
            if (!$userFound) {
                return self::defaultResp("User not found");
            }


        } else if($url === "/groups") {
            //
        } else if($url == "/users_groups") {

        } else {
            return self::defaultResp("Attribute missing");
        }
    }
}