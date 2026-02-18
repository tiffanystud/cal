<?php

require_once __DIR__ . "/../repository/DBAccess.php";

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

    public function getAll(){
        $relations = $this->usersGroup->getAll();
        if (empty($usersGroups)){
            throw new Exception("No relations found.");
        }
        return $relations;
    }
    public function getRelationById($id){
        $relation = $this->findById($id);
        if ($relation){
            throw new Exception("Relation not found");
        }
        return $relation;
    }

    //Denna funktion ska returnera [id=>1, userID=>1, groupID=>1, isAdmin=>true]
    public function getAllRelationsByGroup($groupId) {
        if (!$this->groups->findById($groupId)){
            throw new DomainException("Group not found");
        }

        $relations = $this->usersGroups->getAll();
        
        return array_filter($relations, fn($x) => $x["groupID"] == $groupId);
        
    }
    public function getAllRelationsByUser($userId){
        if (!$this->users->findById($userId)){
            throw new DomainException("User not found.");
        }
        $relations = $this->usersGroups->getAll();
        $relationsOfUser = array_filter($relations, fn($x) => $x["userID" == $userId]);

        return $relationsOfUser;
    }

    public function getAllUsersByGroup($groupId){
        $relations = getAllRelationsByGroup($groupId);
        $userIds = [];
        foreach ($relations as $rel){
            array_push($relations, $rel["userID"]);
        }
        //Ev ska slänga in någon sorts koll...
        $users = [];
        foreach ($userIds as $userId){
            $user = $this->users->findById($userId);
            array_push($users, $user);
        }
        return $users;
    }

    public function getAllGroupsByUser($userId){
        if(!$this->users->findById($userId)){
            throw new Exception("User not found");
        }
        $relations = $this->getAll();
        $relationsOfUser = $this->getRelationsByUser($userId);

        if(empty($relationsOfUser)){
            ///Vet inte om det behöver bli error!
            throw new Exception("User not in any group.");
        }
        $groups = [];
        foreach($relationsOfUser as $rel){
            $group = $this->findById($rel["groupID"]);
            array_push($groups, $group);
        }
        return $groups;
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
        $relations = $this->getAllRelationsByGroup($groupId);
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

        $relations = $this->getAllRelationsByGroup($groupId);

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


    // Kanske ska byta till changeAdminStatus eller ngt.
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

        $relations = $this->getAllRelationsByGroup($groupId);

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

    