<?php

class DBIO {
    private static function dbPath($resource): string {
    return __DIR__ . "/../repository/db/$resource.json";
}

    public static function readDb($resource) {
        $db = file_get_contents(self::dbPath($resource), true);
        return json_decode($db, true);
    }

    public static function writeToDb($resource, $data) {
        file_put_contents(self::dbPath($resource), json_encode($data, JSON_PRETTY_PRINT));
        return true;
    }

}

?>