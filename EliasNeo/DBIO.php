<?php

    function readDb() {
        $db = file_get_contents("db.json");
        return json_decode($db, true);
    }
    function writeToDb($data) {
        file_put_contents("db.json", json_encode($data, JSON_PRETTY_PRINT));
        return true;
    }




   






?>