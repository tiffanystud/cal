<?php

class RestoreDBController {

    public static function handle() {

        // Sökvägar
        $sourceDir = __DIR__ . "/../repository/db/";
        $backupDir = __DIR__ . "/../repository/db_backup/";

        // Hämta alla JSON-filer i backup/
        $files = glob($backupDir . "*.json");

        foreach ($files as $file) {

            $filename = basename($file);
            $restorePath = $sourceDir . $filename;

            // Kopiera tillbaka filen
            copy($file, $restorePath);
        }

        echo json_encode(["message" => "Database restored"]);
        exit;
    }
}
