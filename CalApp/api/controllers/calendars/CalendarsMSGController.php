
<?php

require_once __DIR__ . "/../services/CalendarsMSGService.php";
require_once __DIR__ . "sendJSON.php";

class CalendarsMSGController {
    public static function handle($method, $input) {
        if ($method === "GET") {
            try {
                CalendarsMSGService::getAll($input);
            } catch (Exception $e) {
                $msg = $e->getMessage();
                $data = ["error" => $msg];
                if ($msg === "Missing attributes") {
                    sendJSON($data, 400);
                } else if ($msg === "Messages not found") {
                    sendJSON($data, 404);
                }
            }
        }
    }
}