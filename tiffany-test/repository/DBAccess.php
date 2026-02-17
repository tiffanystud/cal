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

    public function patchData($tableParameter, $inputParameter, $inputValue){
        $db = DBIO::readDb();
        $db[this->resource][$tableParameter][$inputParameter] = $inputValue;
        DBIO::writeToDb($db);
    }

    public function deleteData($input, $tableValue, $inputValue){
        $db = DBIO::readDb();
        $db[this->resource] = array_filter($db[this->resource], fn($tableValue) => $tableValue != $inputValue);
        DBIO::writeToDb($db);
    }



}
