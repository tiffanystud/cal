<?php
    require_once __DIR__ . "/../repository/DBAccess.php";
    require_once __DIR__ . "/UsersCalendarsService.php";

    class UserService {
        public static function getAllUsers()
        {
            $db = new DBAccess("users");
            $result = $db->getAll();
            return $result;
        }
        public static function createNewUser($input) {
            $db = new DBAccess("users");
            $result = $db->findByEmail($input["email"]);
            if($result !== null) {
                return ["error" => "User already exists"];
            } else {
                $data = [
                    "id" => uniqid(),
                    "email" => $input["email"],
                    "pwd" => $input["pwd"],
                    "name" => $input["name"]
                ];
                $result = $db->postData($data);
                return $result;
            }

            
        }
        public static function getSpecUser($id) {
            $db = new DBAccess("users");
            $result = $db->findById($id);
            if($result === null) {
                return ["error" => "User not found"];
            } else {
                return $result;
            }
            
        }

        public static function getUsersInCal($calId){
            $relations = UsersCalendarsService::getAllRelationsByCalId($calId);
            $dbU = new DBAccess("users");
            $result = [];
            foreach ($relations as $rel){
                $user = $dbU->findById($rel["userId"]);
                if ($user === null){
                    error_log("Missing user with id {$rel['userId']} in relation table");
                    continue;
                } else {
                    $result[] = $user;
                }
            }
            if (empty($result)){
                return ["error" => "No users found in calendar"];
            } else {
                return $result;
            }

        }

        public static function changeUser($id, $data) {
            $db = new DBAccess("users");
            $result = $db->findById($id);
            if($result === null) {
                return ["error" => "User not found"];
            } else {
                $newData = array_filter($data, function ($value) {
                    return $value !== null;
                });
                $result = $db->patchData($id, $newData);
                return $result;
            }
        }

        public static function deleteUser($data) {
            $db = new DBAccess("users");
            $result = $db->findById($data["id"]);
            if ($result === null) {
                return ["error" => "User not found"];
            }
            if ($result["email"] === $data["email"] && $result["pwd"] === $data["pwd"]) {
                $deleteResult = $db->deleteData($data["id"]);
                return ["message" => "User succesfully deleted"];
            } else {
                return ["error" => "Invalid email or password"];
            }
        }
        
    }


?>

