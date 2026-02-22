<?php

class BackupDBController {

    public static function handle() {
    
        $sourceDir = __DIR__ . "/../repository/db/";
        $backupDir = __DIR__ . "/../repository/db_backup/";

        // Hämta alla filer i db/
        $files = glob($sourceDir . "*.json");

        foreach ($files as $file) {

            $filename = basename($file);
            $backupPath = $backupDir . $filename;

            // Kopiera filen till db_backup
            copy($file, $backupPath);
        }

        echo json_encode(["message" => "Backup created"]);
        exit;
    }
}
