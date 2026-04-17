<?php
    require_once __DIR__ . "/../repository/DBAccess.php";
    require_once __DIR__ . "/UsersCalendarsService.php";

    class UserService {
        public static function getAll() {
            $db = new DBAccess("users");
            return $db->getAll();
        }

        public static function getByParams($input) {
            $db = new DBAccess("users");
            $all = $db->getAll();
            $usersCals = new DBAccess("users_calendars");

            if (isset($input["id"])) {
                $exists = array_find($all, fn($x) => $x["id"] === $input["id"]);
                if (!$exists) throw new Exception("User not found");
                return $exists;
            } else if (isset($input["calId"])) {
                $arr = array_values(array_filter($usersCals, fn($x) => $x["id"] === $input["calId"]));
                return array_values(array_filter($arr, fn($x) => $x["userId"] === $input["id"]));
            } 
        }

        public static function post($input) {
            $db = new DBAccess("users");
            $all = $db->getAll();

            if (!isset($input["name"], $input["password"], $input["email"])) throw new Exception("Missing fields");

            if (!$db->findByEmail($input["email"])) throw new Exception("User already exists");

            $newUser = [
                "id" => uniqid(),
                "name" => $input["name"],
                "pwd" => $input["password"],
                "email" => $input["email"]
            ];
            return $newUser;
        }

        public static function patch($input) {
            $db = new DBAccess("users");
            $all = $db->getAll();

            if (!isset($input["userId"])) throw new Exception("Missing userId parameter");

            $user = db->findById($input["userId"]);
            if (!$user) throw new Exception("User not found");
            $pwd = $input["password"] ?? null;
            $email = $input["email"] ?? null;
            $newData = [];
            if ($pwd) $newData["pwd"] = $pwd;
            if ($email) $newData["email"] = $email;

            return $db->patchData($user["id"], $newData);
        }

        public static function delete($input) {
            $db = new DBAccess("users");
            $all = $db->getAll();

            if (!isset($input["userId"], $input["password"], $input["email"])) throw new Exception("Missing fields");

            $user = $db->findById($input["userId"]);
            if (!$user) throw new Exception("User not found");

            if ($input["password"] !== $user["pwd"] || $input["email"] !== $user["email"]) throw new Exception("Invalid email or password");

            $db->deleteData($user["id"]);
            return ["message" => "User successfully deleted"];
        }
    }
?>

