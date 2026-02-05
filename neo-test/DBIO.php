<?php

class DBIO {
    public static function readDb() {
        $db = file_get_contents("db.json");
        return json_decode($db, true);
    }

    public static function writeToDb($data) {
        file_put_contents("db.json", json_encode($data));
        return true;
    }
}