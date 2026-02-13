<?php

    function readDb() {
        $db = file_get_contents("db.json");
        return json_decode($db, true);
    }
    function writeToDb($data) {
        file_put_contents("db.json", json_encode($data, JSON_PRETTY_PRINT));
        return true;
    }

    function addUser($data) {
        $db = readDb();
        $id = count($db["users"]) + 1;

        $newUser = [
            "id" => $id,
            "userName" => $data["userName"],
            "pwd" => $data["pwd"],
            "email" => $data["email"]
        ];
        array_push($db["users"], $newUser);
        writeToDb($db);
        return $newUser;
    }

    function addGroup($data) {
        $db = readDb();
        $id = count($db["groups"]) + 1;

        $newGroup = [
            "id" => $id,
            "name" => $data["name"]
        ];
        array_push($db["groups"], $newGroup);
        writeToDb($db);
        return $newGroup;
    }

    function addUserToGroup($data) { //userID, groupId, isAdmin
        $db = readDb();

        $userExist = false;
        foreach($db["users"] as $user) {
            if($user["id"] === $data["userID"]) {
                $userExist = true;
                break;
            }
        }
        $groupExist = false;
        foreach($db["groups"] as $group) {
            if($group["id"] === $data["groupID"]) {
                $groupExist = true;
                break;
            }
        }
        if($userExist && $groupExist) {
            $id = count($db["users_groups"]) + 1;
            $newUserToGroup = [
                "id" => $id,
                "userId" => $data["userID"],
                "groupId" => $data["groupID"],
                "isAdmin" => $data["isAdmin"]
            ];
            array_push($db["users_groups"], $newUserToGroup);
            writeToDb($db);
            return $newUserToGroup;
        } else {
            return ["error" => "User or group dont exist"];
        }
        
    }

    function patchUser($data) {
        $db = readDb();
    
        $userExist = false;
        foreach ($db["users"] as $user) {
            if ($user["id"] === $data["id"]) {
                $userExist = true;
                break;
            }
        }
    
        if ($userExist) {
            $newUserName = null;
            $newPwd = null;
            $newEmail = null;
    
            if (isset($data["userName"])) {
                $newUserName = $data["userName"];
            }
            if (isset($data["pwd"])) {
                $newPwd = $data["pwd"];
            }
            if (isset($data["email"])) {
                $newEmail = $data["email"];
            }
    
            foreach ($db["users"] as &$user) {
                if ($user["id"] === $data["id"]) {
                    if ($newUserName !== null) {
                        $user["userName"] = $newUserName;
                    }
                    if ($newPwd !== null) {
                        $user["pwd"] = $newPwd;
                    }
                    if ($newEmail !== null) {
                        $user["email"] = $newEmail;
                    }
                    break;
                }
            }
            writeToDb($db);
            return ["success" => "User updated successfully"];
        } else {
            return ["error" => "User doesn't exist"];
        }
    }
        
    
    





?>