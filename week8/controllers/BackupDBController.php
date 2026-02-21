<?php

class BackupDBController {

    public static function handle() {

        error_log("------------- DB BACKUP körs! --------------");

    
        $sourceDir = __DIR__ . "/../repository/db/";
        $backupDir = __DIR__ . "/../repository/db_backup/";

        error_log("DIR: " . __DIR__);
        error_log("SOURCE: " . $sourceDir);
        error_log("BACKUP: " . $backupDir);

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
