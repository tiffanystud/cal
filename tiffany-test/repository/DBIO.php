<?php

class DBIO {
    private static function dbPath(): string {
    return __DIR__ . "db.json";
}

    public static function readDb() {
        $db = file_get_contents(self::dbPath(), true);
        return json_decode($db, true);
    }

    public static function writeToDb($data) {
        file_put_contents(self::dbPath(), json_encode($data, JSON_PRETTY_PRINT));
        return true;
    }

}

?>