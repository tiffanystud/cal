<?php

function readDb() {
    return json_decode(file_get_contents("../db/db.json", true));
}

function writeToDb($data) {
    file_put_contents("../db/db.json", json_encode($data, JSON_PRETTY_PRINT));
    return true;
}

?>