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
}
