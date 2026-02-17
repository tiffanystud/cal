<?php

require_once __DIR__ . "/../repositories/DBAccess.php";

class GroupService {
    
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
    
}