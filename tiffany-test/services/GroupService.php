<?php

require_once __DIR__ . "/../repositories/DBAccess.php";

class GroupService {
    

    /* ---- GET ---- */
    public static function getAll() {
        
        // Hämtar db för bara groups, conatructorn sätter resource till ex: "groups"
        $db = new DBAccess("groups");
        $groups = $db->getAll();
        
        if (empty($groups)) {
            throw new Exception("No groups found");
        }
        
        return $groups;
    
    }
    
    public static function getById($id) {
        // Hämtar db för bara groups, conatructorn sätter resource till ex: "groups"
        $db = new DBAccess("groups");
        $group = $db->findById($id);
        
        if (!$group) { 
            throw new Exception("Group not found"); 
        } 
        
        return $group;
    }
    public static function getByName($name) {
        // Hämtar db för bara groups, conatructorn sätter resource till ex: "groups"
        $db = new DBAccess("groups");
        $group = $db->findById($name);
        
        if (!$group) { 
            throw new Exception("Group not found"); 
        } 
        
        return $group;
    }
    
    
    
    /* --- POST ---- */
    public static function createGroup($input) {

        if (!isset($input["name"])) {
            throw new Exception("Group must have a name");
        }
        
        $db = new DBAccess("groups");
        
        $newGroup = [
            "id" => uniqid(),
            "name" => $input["name"]
        ];
        
        return $db->postData($newGroup);
    }
    
    /* --- PATCH ---- */
    public static function updateGroup($input) {

        if (!isset($input["id"])) {
            throw new Exception("Id missing");
        }
        if (!isset($input["name"])) {
            throw new Exception("Name missing");
        }
        
        $db = new DBAccess("groups");

        return $db->patchData($input["id"], ["name" => $input["name"]]);
            
    }
    
    /* --- DELETE ---- */
    public static function deleteGroup($id) {  
             
        $db = new DBAccess("groups");
        
        
        if (!isset($input["id"])) {
            throw new Exception("Id missing");
        }
        return $db->deleteData($id);
        
    }
    
    
    
    
    
}