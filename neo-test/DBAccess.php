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
        
        // PATCH: /users
        if($url === "/users") {
    
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
            // Elias kör

            
        // PATCH: /groups
        } else if ($url === "/groups") {
            
            //Check if input contains ID and name
            if (!isset($input["id"]) and !isset($input["name"]) ) {
                return self::defaultResp("Attributes missing");
            }
            
            $existingGroups = $db["groups"];
            $newName = $input["name"];
            
            foreach($existingGroups as $currentGroup) {
                // Update group name if ID found
                if ($currentGroup["id"] == $input["id"]) {
                    
                    $currentGroup["name"] = $newName;
                    return $currentGroup;
                    
                } else {
                    
                    return self::defaultResp(message: "Not found. Could not update.");
                }
                
            }
            // Hitta gruppen med id 
            
        // PATCH: /users_groups
        } else if ($url == "/users_groups") {

            if (!isset($input["me"]) || !isset($input["updates"])) {
                return self::defaultResp("Missing me or updates");
            }

            //Req. attributen (två olika ass. arrs)
            $me = $input["me"];
            $updates = $input["updates"];
        
            // Me attributes
            $meUserID = $me["userID"];
            $meGroupID = $me["groupID"];
            $meIsAdmin = false;
            
            // Target/update attributes
            $targetUserID = $updates["userID"];
            $updateAdminStatus = $updates["isAdmin"];

            foreach ($db["users_groups"] as $currentUsersGroup) {

                // Kolla om me finns i user_groups
                if (
                    $currentUsersGroup["userID"] == $meUserID &&
                    $currentUsersGroup["groupID"] == $meGroupID
                ) {
                    // Kolla om den som skickar request (me) är admin
                    if (!$currentUsersGroup["isAdmin"] == false) {
                        return self::defaultResp("Unauthorized");
                    }

                // Hitta target som ska uppdateras
                foreach($db["users_groups"] as $targetCurrentUserGroup) {
                    if (
                        // Kolla om me är admin i target group 
                        $targetCurrentUserGroup["userID"] == $targetUserID && 
                        $targetCurrentUserGroup["groupID"] == $meGroupID
                        ) {
                            $targetCurrentUserGroup["isAdmin"] = $updateAdminStatus;
                            return $targetCurrentUserGroup;
                        }
                    }                    

                    return self::defaultResp("Unauthorized");
                }
            }

            return self::defaultResp("Not found");
            
        } else {
            
            return self::defaultResp("Attribute missing");
            
        }
    }
}