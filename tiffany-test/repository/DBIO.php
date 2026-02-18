<?php

class DBIO {
    public static function readDb() {
        $db = file_get_contents("db.json", true);
        return json_decode($db, true);
    }

    public static function writeToDb($data) {
        $db = file_get_contents("db.json", true);
        file_put_contents($db,json_encode($data, JSON_PRETTY_PRINT));

        return true;
    }
}

?>