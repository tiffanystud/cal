<?php

    function readDb() {
        $db = file_get_contents("db.json");
        return json_decode($db, true);
    }
    function writeToDb($data) {
        file_put_contents("db.json", json_encode($data, JSON_PRETTY_PRINT));
        return true;
    }

    function addUser($data) {
        $db = readDb();
        $id = count($db["users"]) + 1;

        $newUser = [
            "id" => $id,
            "userName" => $data["userName"],
            "pwd" => $data["pwd"],
            "email" => $data["email"]
        ];
        array_push($db["users"], $newUser);
        writeToDb($db);
        return $newUser;
    }
    





?>