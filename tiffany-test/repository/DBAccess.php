<?php

require_once "DBIO.php";

class DBAccess {
    // resource kommer från services ex: "$db = new DBAccess("groups")"
    private $resource;

    public function __construct($resource) {
        $this->resource = $resource;
    }

    public function getAll() {
        $db = DBIO::readDb();
        
        // Resource ex: "groups" = return $this->db["groups"];
        return $db[$this->resource] ?? [];
    }

    public function findById($id) {
        $db = DBIO::readDb();
        $items = $db[$this->resource] ?? [];

        foreach ($items as $item) {
            if ($item["id"] == $id) {
                return $item;
            }
        }

        return null;
    }
    
        public function findByName($name) {
        $db = DBIO::readDb();
        $items = $db[$this->resource] ?? [];

        foreach ($items as $item) {
            if ($item["name"] == $name) {
                return $item;
            }
        }

        return null;
    }  


    public function postData($input){
        $db = DBIO::readDb();
        array_push($db[$this->resource], $input);
        DBIO::writeToDb($db);
    }

    // id: id, changes: ["name" => "newName", "pwd" => "newPwd"]
    public function patchData($id, $newData){
        
        $db = DBIO::readDb();
        $dbItems = $db[$this->resource];
        
        foreach ($dbItems as $currentIndex => $item) {
            if ($item["id"] == $id) {

                // Updates the fields that are present in [changes]
                foreach ($newData as $key => $value) {
                    $dbItems[$currentIndex][$key] == $value;
                }
                
                // Save
                $db[$this->resource] = $dbItems;
                DBIO::writeToDb($db);
                
                return $dbItems[$currentIndex];
            }
        }
        
        throw new Exception("Not found");
    }

    public function deleteData($input){
        $db = DBIO::readDb();
        $db[$this->resource] = array_filter($db[$this->resource], fn($tableObject) => $tableObject != $input);
        DBIO::writeToDb($db);
    }



}
