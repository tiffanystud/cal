<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersGroupsService {
    public static function getAll(){
        $db = new DBAccess("users_groups");
        $relations = $db->getAll();

        if (empty($relations)) {
            throw new Exception("No relations found.");
        }

        return $relations;
    }

    public static function getRelationById($id){
        $db = new DBAccess("users_groups");
        $relation = $db->findById($id);

        if (!$relation) {
            throw new Exception("Relation not found.");
        }

        return $relation;
    }

    public static function getAllRelationsByGroup($groupId){
        // Validate group exists
        $dbGroups = new DBAccess("groups");
        if (!$dbGroups->findById($groupId)) {
            throw new Exception("Group not found.");
        }

        $db = new DBAccess("users_groups");
        $relations = $db->getAll();

        return array_values(
            array_filter($relations, fn($x) => $x["groupID"] == $groupId)
        );
    }

    public static function getAllRelationsByUser($userId){
        // Validate user exists
        $dbUsers = new DBAccess("users");
        if (!$dbUsers->findById($userId)) {
            throw new Exception("User not found.");
        }

        $db = new DBAccess("users_groups");
        $relations = $db->getAll();

        return array_values(
            array_filter($relations, fn($x) => $x["userID"] == $userId)
        );
    }


 
    // Requires: userId, groupId, adminId
    public static function addUserToGroup($input){
        
        if (!isset($input["userId"])) {
            throw new Exception("User ID missing.");
        }
        if (!isset($input["groupId"])) {
            throw new Exception("Group ID missing.");
        }

        $userId  = $input["userId"];
        $groupId = $input["groupId"];
        $isAdmin = $input["isAdmin"] ?? false;

        $dbUsers  = new DBAccess("users");
        $dbGroups = new DBAccess("groups");
        $dbUG     = new DBAccess("users_groups");

        // Finns user?
        if (!$dbUsers->findById($userId)) {
            throw new Exception("User not found.");
        }

        // Finns group?
        if (!$dbGroups->findById($groupId)) {
            throw new Exception("Group not found.");
        }

        // finns reda u_g?
        $existing = $dbUG->getAll();
        foreach ($existing as $rel) {
            
            if ($rel["userID"] == $userId && $rel["groupID"] == $groupId) {
                throw new Exception("Relation already exists.");
            }
        }

        $newRelation = [
            "id"      => uniqid(),
            "userID"  => $userId,
            "groupID" => $groupId,
            "isAdmin" => $isAdmin
        ];

        return $dbUG->postData($newRelation);
    }





    //  Requirs: id (relation id), adminId
    public static function removeUserFromGroup($input) {
        
        if (!isset($input["id"]))      throw new Exception("UserGroup ID missing.");
        if (!isset($input["adminId"])) throw new Exception("Admin ID missing.");

        $relationId = $input["id"];
        $adminId    = $input["adminId"];

        $dbUG = new DBAccess("users_groups");

        $relation = $dbUG->findById($relationId);
        if (!$relation) {
            throw new Exception("Relation not found.");
        }

        $relations = self::getAllRelationsByGroup($relation["groupID"]);

        // is admin is admin?
        $adminIsAdmin = false;
        foreach ($relations as $rel) {
            if ($rel["userID"] == $adminId && $rel["isAdmin"] === true) {
                $adminIsAdmin = true;
                break;
            }
        }
        if (!$adminIsAdmin) {
            throw new Exception("Only admin can remove users from group.");
        }

        return $dbUG->deleteData($relationId);
    }



    //  Requires: id (relation id), adminId
    public static function makeUserGroupAdmin($input)
    {
        if (!isset($input["id"]))      throw new Exception("Relation ID missing.");
        if (!isset($input["adminId"])) throw new Exception("Admin ID missing.");

        $relationId = $input["id"];
        $adminId    = $input["adminId"];

        $dbUG = new DBAccess("users_groups");

        $relation = $dbUG->findById($relationId);
        if (!$relation) {
            throw new Exception("Relation not found.");
        }

        $relations = self::getAllRelationsByGroup($relation["groupID"]);

        // is admin admin?
        $adminIsAdmin = false;
        foreach ($relations as $rel) {
            if ($rel["userID"] == $adminId && $rel["isAdmin"] === true) {
                $adminIsAdmin = true;
                break;
            }
        }
        if (!$adminIsAdmin) {
            throw new Exception("Only admin can change admin status.");
        }

        // Only allowed change: isAdmin = true
        return $dbUG->patchData($relationId, ["isAdmin" => true]);
    }
}

