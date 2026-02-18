<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersGroupsService
{

    public static function getAll()
    {
        $db = new DBAccess("users_groups");
        $relations = $db->getAll();
        if (empty($usersGroups)) {
            throw new Exception("No relations found.");
        }
        return $relations;
    }
    public static function getRelationById($id)
    {
        $db = new DBAccess("users_groups");
        $relation = $db->findById($id);
        if ($relation) {
            throw new Exception("Relation not found");
        }
        return $relation;
    }

    //Denna funktion ska returnera [id=>1, userID=>1, groupID=>1, isAdmin=>true]
    public static function getAllRelationsByGroup($groupId){
        $dbGroups = new DBAccess("groups");
        if (!$dbGroups->findById($groupId)) {
            throw new DomainException("Group not found");
        }
        $db = new DBAccess("users_groups");
        $relations = $db->getAll();

        return array_filter($relations, fn($x) => $x["groupID"] == $groupId);

    }
    public static function getAllRelationsByUser($userId){
        $dbUsers = new DBAccess("users");
        if (!$dbUsers->findById($userId)) {
            throw new DomainException("User not found.");
        }
        $db = new DBAccess("users_groups");
        $relations = $db->getAll();
        $relationsOfUser = array_filter($relations, fn($x) => $x["userID" == $userId]);

        return $relationsOfUser;
    }

    public static function getAllUsersByGroup($groupId)
    {
        $relations = self::getAllRelationsByGroup($groupId);
        $userIds = [];
        foreach ($relations as $rel) {
            array_push($relations, $rel["userID"]);
        }
        //Ev ska slänga in någon sorts koll...
        $dbUsers = new DBAccess("users");
        $users = [];
        foreach ($userIds as $userId) {
            $user = $dbUsers->findById($userId);
            if(!$user){
                throw new Exception("User in group does not exist");
            }
            array_push($users, $user);
        }
        return $users;
    }

    public static function getAllGroupsByUser($userId) {
        $dbUsers = new DBAccess("users");
        $dbGroups = new DBAccess("groups");
        
        if (!$dbUsers->findById($userId)) {
            throw new Exception("User not found");
        }
        $relations = self::getAll();
        $relationsOfUser = self::getRelationsByUser($userId);

        if (empty($relationsOfUser)) {
            ///Vet inte om det behöver bli error!
            throw new Exception("User not in any group.");
        }
        
        $groups = [];
        foreach ($relationsOfUser as $rel) {
            $group = $dbGroups->findById($rel["groupID"]);
            array_push($groups, $group);
        }
        return $groups;
    }

    public static function addUserToGroup($input)
    {
        if (!isset($input["userId"])) {
            throw new Exception("User ID missing.");
        }
        if (!isset($input["adminId"])) {
            throw new Exception("Admin ID missing.");
        }
        if (!isset($input["groupId"])) {
            throw new Exception("Group ID missing.");
        }
        $userId = $input["userId"];
        $adminId = $input["adminId"];
        $groupId = $input["groupId"];

        $dbUsers = new DBAccess("users");
        $db = new DBAccess("users_groups");

        //Kolla om användaren finns!
        $userExists = $dbUser->findById($userId);
        if (!$userExists) {
            throw new DomainException("User not found");
        }
        // Kolla om gruppen finns!  
        $relations = self::getAllRelationsByGroup($groupId);
        // Kolla om admin är admin!
        $adminIsAdmin = array_any($relations, fn($x) => $x["userID"] == $adminId && $x["isAdmin"] == true);
        if (!$adminIsAdmin) {
            throw new DomainException("Only admin can add users to group.");
        }
        // Kolla om användaren finns i gruppen!
        $userInGroup = array_any($relations, fn($x) => $x["userID"] == $userId);
        if ($userInGroup) {
            throw new DomainException("User already in group.");
        }
        $newId = uniqid();
        // Här blir man då per default inte admin, men om man skapar en grupp måste man ju bli admin...
        return $db->postData(["id" => $newId, "userID" => $userId, "groupID" => $groupId, "isAdmin" => false]);

    }

    public static function removeUserFromGroup($input)
    {
        if (!isset($input["userId"])) {
            throw new Exception("User ID missing.");
        }
        if (!isset($input["adminId"])) {
            throw new Exception("Admin ID missing.");
        }
        if (!isset($input["groupId"])) {
            throw new Exception("Group ID missing.");
        }
        $userId = $input["userId"];
        $adminId = $input["adminId"];
        $groupId = $input["groupId"];

        $db = new DBAccess("users_groups");

        $relations = self::getAllRelationsByGroup($groupId);

        $adminIsAdmin = array_any($relations, fn($x) => $x["userID"] == $adminId && $x["isAdmin"] == true);
        if (!$adminIsAdmin) {
            throw new DomainException("Only admin can add users to group.");
        }
        $userInGroup = array_find($relations, fn($x) => $x["userID"] == $userId);
        if (!$userInGroup) {
            throw new DomainException("User not in group.");
        }
        return $db->deleteData($userInGroup);
    }


    // Kanske ska byta till changeAdminStatus eller ngt.
    public static function makeUserGroupAdmin($input)
    {
        if (!isset($input["userId"])) {
            throw new Exception("User ID missing.");
        }
        if (!isset($input["adminId"])) {
            throw new Exception("Admin ID missing.");
        }
        if (!isset($input["groupId"])) {
            throw new Exception("Group ID missing.");
        }
        $userId = $input["userId"];
        $adminId = $input["adminId"];
        $groupId = $input["groupId"];

        $db = new DBAccess("users_groups");

        $relations = self::getAllRelationsByGroup($groupId);

        $adminIsAdmin = array_any($relations, fn($x) => $x["userID"] == $adminID && $x["isAdmin"] == true);
        if (!$adminIsAdmin) {
            throw new Exception("Only admin can make user admin.");
        }
        $userInGroup = array_find($relations, fn($x) => $x["userID"] == $userId);

        if (!$userInGroup) {
            throw new Exception("User is not in group.");
        }

        return $db->patchData($userInGroup);

    }
}


