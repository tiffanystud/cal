<?php

require_once __DIR__ . "/../repositories/DBAccess.php";

class UsersGroupsService {

    private DBAccess $users;
    private DBAccess $groups;
    private DBAccess $userGroups;

    public function __construct()
    {
        $this->users = new DBAccess("users");
        $this->groups = new DBAccess("groups");
        $this->usersGroups = new DBAccess("user_groups");
    }

    public function addUserToGroup($input) {
        if(!isset($input["userId"])){
            throw new Exception("User ID missing.");
        }
        if(!isset($input["adminId"])){
            throw new Exception("Admin ID missing.");
        }
        if(!isset($input["groupId"])){
            throw new Exception("Group ID missing.");
        }
        $userId = $input["userId"];
        $adminId = $input["adminId"];
        $groupId = $input["groupId"];
            
        //Kolla om användaren finns!
        $userExists = $this->users->findById($userId);
        if (!$userExists){
            throw new DomainException("User not found");
        }
        // Kolla om gruppen finns!  
        $relations = $this->getAllUsersInGroup($groupId);
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
        $newId = newId($groupId);
        // Här blir man då per default inte admin, men om man skapar en grupp måste man ju bli admin...
        return $this->usersGroup->postData(["id" => $newId, "userID" => $userId, "groupID" => $groupId, "isAdmin" => false]);        

        }
    
    public static function removeUserFromGroup($input) {
        if(!isset($input["userId"])){
            throw new Exception("User ID missing.");
        }
        if(!isset($input["adminId"])){
            throw new Exception("Admin ID missing.");
        }
        if(!isset($input["groupId"])){
            throw new Exception("Group ID missing.");
        }
        $userId = $input["userId"];
        $adminId = $input["adminId"];
        $groupId = $input["groupId"];

        $relations = $this->getAllUsersInGroup($groupId);

        $adminIsAdmin = array_any($relations, fn($x) => $x["userID"] == $adminId && $x["isAdmin"] == true);
        if (!$adminIsAdmin) {
            throw new DomainException("Only admin can add users to group.");
        }
        $userInGroup = array_find($relations, fn($x) => $x["userID"] == $userId);
        if (!$userInGroup) {
            throw new DomainException("User not in group.");
        }
        return $this->usersGroup->deleteData($userInGroup);    
    }

    //Denna funktion returnerar eg. inte alla användare i gruppen, men hela posten typ
    // [id=>1, userID=>1, groupID=>1, isAdmin=>true]
    public function getAllUsersInGroup($groupId) {
        if (!$this->groups->findById($groupId)){
            throw new DomainException("Group not found");
        }

        $relations = $this->usersGroups->getAll();
        
        return array_filter($relations, fn($x) => $x["groupID"] == $groupId);
        
    }

    public function makeUserGroupAdmin($input){
        if(!isset($input["userId"])){
            throw new Exception("User ID missing.");
        }
        if(!isset($input["adminId"])){
            throw new Exception("Admin ID missing.");
        }
        if(!isset($input["groupId"])){
            throw new Exception("Group ID missing.");
        }
        $userId = $input["userId"];
        $adminId = $input["adminId"];
        $groupId = $input["groupId"];

        $relations = $this->getAllUsersInGroup($groupId);

        $adminIsAdmin = array_any($relations, fn($x) => $x["userID"] == $adminID && $x["isAdmin"] == true);
        if (!$adminIsAdmin){
            throw new Exception("Only admin can make user admin.");
        }
        $userInGroup = array_find($relations, fn($x) => $x["userID"] == $userId);

        if(!$userInGroup){
            throw new Exception("User is not in group.");
        }

        return $this->userGroups->patchData($userInGroup);

        }

    }
    
    function newId($groupId){
        $maxId = 0;
        foreach ($this->usersGroups->getAll() as $uG){
            if ($uG > $maxId){
                $maxId = $uG;
            }
        }
        return $maxId + 1;

    }

    