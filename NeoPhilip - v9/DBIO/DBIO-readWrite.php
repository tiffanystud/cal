<?php

function readDb($backup = null) {
    if (!$backup) {
        return json_decode(file_get_contents("../db/db.json"), true);
    } else {
        return json_decode(file_get_contents("../db/db-backup.json"), true);
    }
}

function resetDb() {
    file_put_contents("../db/db.json", json_encode(readDb("backup"), JSON_PRETTY_PRINT));
    return true;
}

function writeToDb($data) {
    file_put_contents("../db/db.json", json_encode($data, JSON_PRETTY_PRINT));
    return true;
}

?>