<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersGroupsService
{
    /* ---- GET ALL ---- */
    public static function getAll()
    {
        $db = new DBAccess("users_groups");
        $relations = $db->getAll();

        if (empty($relations)) {
            throw new Exception("No relations found.");
        }

        return $relations;
    }

    /* ---- GET BY ID ---- */
    public static function getRelationById($id)
    {
        $db = new DBAccess("users_groups");
        $relation = $db->findById($id);

        if (!$relation) {
            throw new Exception("Relation not found.");
        }

        return $relation;
    }

    /* ---- GET ALL RELATIONS BY GROUP ---- */
    public static function getAllRelationsByGroup($groupId)
    {
        // Säkerställ att gruppen finns
        $dbGroups = new DBAccess("groups");
        if (!$dbGroups->findById($groupId)) {
            throw new DomainException("Group not found.");
        }

        $db = new DBAccess("users_groups");
        $relations = $db->getAll();

        return array_values(
            array_filter($relations, fn($x) => $x["groupId"] == $groupId)
        );
    }

    /* ---- GET ALL RELATIONS BY USER ---- */
    public static function getAllRelationsByUser($userId)
    {
        // Säkerställ att användaren finns
        $dbUsers = new DBAccess("users");
        if (!$dbUsers->findById($userId)) {
            throw new DomainException("User not found.");
        }

        $db = new DBAccess("users_groups");
        $relations = $db->getAll();

        return array_values(
            array_filter($relations, fn($x) => $x["userId"] == $userId)
        );
    }

    /* ---- GET ALL USERS IN GROUP ---- */
    public static function getAllUsersByGroup($groupId)
    {
        $relations = self::getAllRelationsByGroup($groupId);
        $userIds = [];

        foreach ($relations as $rel) {
            $userIds[] = $rel["userId"];
        }

        $dbUsers = new DBAccess("users");
        $users = [];

        foreach ($userIds as $userId) {
            $user = $dbUsers->findById($userId);
            if (!$user) {
                throw new Exception("User in group does not exist.");
            }
            $users[] = $user;
        }

        return $users;
    }

    /* ---- GET ALL GROUPS FOR USER ---- */
    public static function getAllGroupsByUser($userId)
    {
        $dbUsers = new DBAccess("users");
        $dbGroups = new DBAccess("groups");

        if (!$dbUsers->findById($userId)) {
            throw new Exception("User not found.");
        }

        $relationsOfUser = self::getAllRelationsByUser($userId);

        if (empty($relationsOfUser)) {
            throw new Exception("User not in any group.");
        }

        $groups = [];
        foreach ($relationsOfUser as $rel) {
            $group = $dbGroups->findById($rel["groupId"]);
            if (!$group) {
                throw new Exception("Group in relation does not exist.");
            }
            $groups[] = $group;
        }

        return $groups;
    }

    /* ---- ADD USER TO GROUP (POST) ---- */
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
        $dbGroups = new DBAccess("groups");
        $db = new DBAccess("users_groups");

        // Kolla om användaren finns
        $userExists = $dbUsers->findById($userId);
        if (!$userExists) {
            throw new DomainException("User not found.");
        }

        // Kolla om gruppen finns
        $groupExists = $dbGroups->findById($groupId);
        if (!$groupExists) {
            throw new DomainException("Group not found.");
        }

        // Hämta alla relationer i gruppen
        $relations = self::getAllRelationsByGroup($groupId);

        // Kolla om admin är admin i gruppen
        $adminIsAdmin = false;
        foreach ($relations as $rel) {
            if ($rel["userId"] == $adminId && $rel["isAdmin"] === true) {
                $adminIsAdmin = true;
                break;
            }
        }
        if (!$adminIsAdmin) {
            throw new DomainException("Only admin can add users to group.");
        }

        // Kolla om användaren redan är i gruppen
        foreach ($relations as $rel) {
            if ($rel["userId"] == $userId) {
                throw new DomainException("User already in group.");
            }
        }

        $newId = uniqid();

        return $db->postData([
            "id" => $newId,
            "userId" => $userId,
            "groupId" => $groupId,
            "isAdmin" => false
        ]);
    }

    /* ---- REMOVE USER FROM GROUP (DELETE) ---- */
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

        // Kolla om admin är admin
        $adminIsAdmin = false;
        foreach ($relations as $rel) {
            if ($rel["userId"] == $adminId && $rel["isAdmin"] === true) {
                $adminIsAdmin = true;
                break;
            }
        }
        if (!$adminIsAdmin) {
            throw new DomainException("Only admin can remove users from group.");
        }

        // Hitta relationen för user + group
        $userRelation = null;
        foreach ($relations as $rel) {
            if ($rel["userId"] == $userId) {
                $userRelation = $rel;
                break;
            }
        }

        if (!$userRelation) {
            throw new DomainException("User not in group.");
        }

        // deleteData förväntar sig id
        return $db->deleteData($userRelation["id"]);
    }

    /* ---- CHANGE ADMIN STATUS (PATCH, endast isAdmin) ---- */
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

        // Kolla om admin är admin
        $adminIsAdmin = false;
        foreach ($relations as $rel) {
            if ($rel["userId"] == $adminId && $rel["isAdmin"] === true) {
                $adminIsAdmin = true;
                break;
            }
        }
        if (!$adminIsAdmin) {
            throw new Exception("Only admin can change admin status.");
        }

        // Hitta relationen för user + group
        $userRelation = null;
        foreach ($relations as $rel) {
            if ($rel["userId"] == $userId) {
                $userRelation = $rel;
                break;
            }
        }

        if (!$userRelation) {
            throw new Exception("User is not in group.");
        }

        // Enda fältet som får ändras här: isAdmin
        return $db->patchData($userRelation["id"], ["isAdmin" => true]);
    }
}
