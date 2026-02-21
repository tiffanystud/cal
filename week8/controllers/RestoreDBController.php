<?php

class RestoreDBController {

    public static function handle() {
            
        // Sökvägar
        $sourceDir = __DIR__ . "/../repository/db/";
        $backupDir = __DIR__ . "/../repository/db_backup/";

        // Hämta alla filer i db_backup/
        $files = glob($backupDir . "*.json");

        foreach ($files as $file) {

            $filename = basename($file);
            $restorePath = $sourceDir . $filename;

            // SKriver över filen i db (efter testerna, dvs efter att filerna i db ändrats)
            copy($file, $restorePath);
        }

        echo json_encode(["message" => "Database restored"]);
        exit;
    }
}
