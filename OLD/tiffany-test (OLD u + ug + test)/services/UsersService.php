<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersService
{

    /* ---- GET ---- */

    public static function getAll()
    {
        $db = new DBAccess("users");
        $users = $db->getAll();

        if (empty($users)) {
            throw new Exception("No users found");
        }

        return $users;
    }

    public static function getById($id)
    {
        $db = new DBAccess("users");
        $user = $db->findById($id);

        if (!$user) {
            throw new Exception("User not found");
        }

        return $user;
    }

    public static function getByUserName($userName)
    {
        $db = new DBAccess("users");
        $users = $db->getAll();

        foreach ($users as $u) {
            if ($u["userName"] === $userName) {
                return $u;
            }
        }

        throw new Exception("User not found");
    }


    /* ---- POST ---- */
    public static function createUser($input)
    {
        if (!isset($input["userName"])) {
            throw new Exception("Username missing");
        }
        if (!isset($input["pwd"])) {
            throw new Exception("Password missing");
        }
        if (!isset($input["email"])) {
            throw new Exception("Email missing");
        }

        $db = new DBAccess("users");

        $newUser = [
            "id" => uniqid(),
            "userName" => $input["userName"],
            "pwd" => $input["pwd"],
            "email" => $input["email"]
        ];

        return $db->postData($newUser);
    }


    /* ---- PATCH ---- */
    // Expects id + changes[]
    public static function updateUser($input)
    {
        if (!isset($input["id"])) {
            throw new Exception("Id missing");
        }

        $db = new DBAccess("users");
        $id = $input["id"];
        
        $existingUser = $db->findById($id); 
        if (!$existingUser) { 
            throw new Exception("User not found"); 
        }
        
        $validKeys = array_keys($existingUser);
        $changes = [];
        
        foreach ($input as $key => $value) { 
            
            if ($key === "id") { continue; }
                
            if (!in_array ($key, $validKeys)) { 
                throw new Exception("Invalid field: $key"); 
            }
            
            $changes[$key] = $value; 
        }
        
        if (empty($changes)) { 
            throw new Exception("No valid fields to update"); 
        }
        
        return $db->patchData($id, $changes);
    }


    /* ---- DELETE ---- */
    public static function deleteUser($input)
    {
        if (!isset($input["id"])) {
            throw new Exception("Id missing");
        }

        $db = new DBAccess("users");
        return $db->deleteData($input["id"]);
    }
}
