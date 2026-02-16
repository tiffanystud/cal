<?php

    function readDb() {
        $db = file_get_contents("db.json");
        return json_decode($db, true);
    }
    function resetDb() {
        $backupDb = file_get_contents("db copy.json");
        writeToDb(json_decode($backupDb), true);
    }
    function writeToDb($data) {
        file_put_contents("db.json", json_encode($data, JSON_PRETTY_PRINT));
        return true;
    }

    function addUser($data) {
        $db = readDb();
        $ids = array_column($db["users"], "id");
        $newID = max($ids) + 1;

        $newUser = [
            "id" => $newID,
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
        $ids = array_column($db["groups"], "id");
        $newID = max($ids) + 1;

        $newGroup = [
            "id" => $newID,
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
            $ids = array_column($db["users_groups"], "id");
            $newID = max($ids) + 1;
            $newUserToGroup = [
                "id" => $newID,
                "userID" => $data["userID"],
                "groupID" => $data["groupID"],
                "isAdmin" => $data["isAdmin"]
            ];
            array_push($db["users_groups"], $newUserToGroup);
            writeToDb($db);
            return $newUserToGroup;
        } else {
            return ["error" => "User or group dont exist"];
        }
        
    }

    function deleteGroup($data) {
        $db = readDb();

        $group = array_find($db["groups"], fn($x) => $x["id"] === $data["id"]);
        if (!$group) {
            return ["error" => "Group not found"];
        } else if ($group["name"] !== $data["name"]) {
            return ["error" => "Group name does not match input"];
        }

        for ($i=0; $i<count($db["groups"]); $i++) {
            if ($db["groups"][$i]["id"] === $group["id"]) {
                array_splice($db["groups"], $i, 1);
                writeToDb($db);
                return ["success" => "Group deleted successfully"];
            }
        }
    }

    function deleteUser($data) {
        $db = readDb();

        $user = array_find($db["users"], fn($x) => $x["id"] === $data["id"]);
        if (!$user) {
            return ["error" => "User not found"];
        } else if ($user["pwd"] !== $data["pwd"]) {
            return ["error" => "Incorrect password"];
        }

        for ($i=0; $i<count($db["users"]); $i++) {
            if ($db["users"][$i]["id"] === $user["id"]) {
                array_splice($db["users"], $i, 1);
                writeToDb($db);
                return ["success" => "User successfully deleted"];
            }
        }
    }

    function getGroups($idParam = null) {
        $db = readDb();

        if ($idParam) {
            $id = intval($idParam);
            $group = array_find($db["groups"], fn($x) => $x["id"] === $id);
            if (!$group) {
                return ["error" => "Group not found"];
            } else {
                return $group;
            }
        } else {
            return $db["groups"];
        }
    }

    function getUsers($idParam = null) {
        $db = readDb();

        if ($idParam) {
            $id = intval($idParam);
            $user = array_find($db["users"], fn($x) => $x["id"] === $id);
            if (!$user) {
                return ["error" => "User not found"];
            } else {
                return $user;
            }
        } else {
            return $db["users"];
        }
    }

    function getUsersGroups($params = null) {
        $db = readDb();

        if ($params) {
            if (isset($params["userID"])) {
                $userID = intval($params["userID"]);
                $allGroupsWithUser = array_filter($db["users_groups"], fn($x) => $x["userID"] === $userID);
                return $allGroupsWithUser;
            } else if (isset($params["groupID"])) {
                $groupID = intval($params["groupID"]);
                $allUsersInGroup = array_filter($db["users_groups"], fn($x) => $x["groupID"] === $groupID);
                return $allUsersInGroup;
            }
        } else {
            return $db["users_groups"];
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

    function patchGroup($data) {
        $db = readDb();

        $groupExist = false;
        foreach($db["groups"] as $group) {
            if($group["id"] === $data["groupID"]) {
                $groupExist = true;
                break;
            }
        }

        if($groupExist) {
            foreach($db["groups"] as &$group) {
                if($group["id"] === $data["groupID"]) {
                    $group["name"] = $data["name"];
                    break;
                }
            }
            writeToDb($db);
            return ["success" => "group updated successfully"];
        } else {
            return ["error" => "group doesn't exist"];
        }
    }

    function removeUserFromGroup($data) {
        $db = readDb();

        $user = array_find($db["users"], fn($x) => $x["id"] === $data["userID"]);
        $group = array_find($db["groups"], fn($x) => $x["id"] === $data["groupID"]);
        if (!$user or !$group) {
            return ["error" => "User or group not found"];
        }

        $userInGroup = array_find($db["users_groups"], fn($x) => $x["userID"] === $user["id"] && $x["groupID"] === $group["id"]);
        if (!$userInGroup) {
            return ["error" => "User is not a member of the specified group"];
        }

        for ($i=0; $i<count($db["users_groups"]); $i++) {
            if ($db["users_groups"][$i]["userID"] === $user["id"] && $db["users_groups"][$i]["groupID"] === $group["id"]) {
                array_splice($db["users_groups"], $i, 1);
                writeToDb($db);
                return ["success" => "User successfully removed from group"];
            }
        }
    }
        
    
    





?>