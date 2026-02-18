<?php

class DBIO {
    public static function readDb() {
        $db = file_get_contents("db.json", true);
        return json_decode($db, true);
    }

    public static function writeToDb($data) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        file_put_contents("db.json", json_encode($data, JSON_PRETTY_PRINT), true);
=======
        $db = file_get_contents("db.json", true);
        file_put_contents($db,json_encode($data, JSON_PRETTY_PRINT));
>>>>>>> Stashed changes
=======
        $db = file_get_contents("db.json", true);
        file_put_contents($db,json_encode($data, JSON_PRETTY_PRINT));
>>>>>>> Stashed changes
=======
        $db = file_get_contents("db.json", true);
        file_put_contents($db,json_encode($data, JSON_PRETTY_PRINT));
>>>>>>> Stashed changes
        return true;
    }
}

?>