<?php
require_once "DBIO.php";

function methodHandler($method, $input, $url) {
    return $method($input, $url);
}

function GET($input, $url) {
    if (isset($input["id"]) && $url === "/users") {
        return getUsers($input["id"]);
    } else if (isset($input["id"]) && $url === "/groups") {
        return getGroup($input["id"]);
    } else {
         switch ($url) {
            case "/users":
                return getUsers();
                break;

            case "/groups":
                return getGroups();
                break;

            case "/users_groups":
                return getUsersGroups();
                break;

            default:
                return ["error" => "Bad request"];
        }
    }
}

function POST($input, $url) {
    if ($url === "/users") {
        if (!isset($input["userName"]) or !isset($input["pwd"]) or !isset($input["email"])) {
            return ["error" => "Missing attributes"];
        }

        $data = ["userName" => $input["userName"], "pwd" => $input["pwd"], "email" => $input["email"]];
        return addUser($data);
    } else if ($url === "/groups") {
        if (!isset($input["name"])) {
            return ["error" => "Missing attributes"];
        }

        $data = ["name" => $input["name"]];
        return addGroup($data);
    } else if ($url === "/users_groups") {
        if (!isset($input["userID"]) or !isset($input["groupID"])) {
            return ["error" => "Missing attributes"];
        }

        $data = ["userID" => $input["userID"], "groupID" => $input["groupID"]];
        return addUserToGroup($data);
    } else {
        return ["error" => "Bad request"];
    }
}

function PATCH($input, $url) {
    if ($url === "/users") {
        $data = [];
        if (isset($input["userName"])) {
            $data["userName"] = $input["userName"];
        } 

        if (isset($input["pwd"])) {
            $data["pwd"] = $input["pwd"];
        } 

        if (isset($input["email"])) {
            $data["email"] = $input["email"];
        }

        if (count($data) === 0) {
            return ["error" => "Invalid attributes"];
        }

        return patchUser($data);
    } else if ($url === "/groups") {
        $data = [];
        if (isset($input["name"])) {
            $data["name"] = $input["name"];
        }

        return patchGroup($data);
    } else {
        return ["error" => "Bad request"];
    }
}

function DELETE($input, $url) {
    if ($url === "/users") {
        if (!isset($input["id"]) or !isset($input["pwd"])) {
            return ["error" => "Attributes missing"];
        }

        $data = ["id" => $input["id"], "pwd" => $input["pwd"]];
        return deleteUser($data);
    } else if($url === "/groups") {
        
    }
}