
<?php

require_once __DIR__ . "/../../services/CalendarsMSGService.php";
require_once __DIR__ . "/../sendJSON.php";

class CalendarsMSGController {
    public static function handle($method, $input) {
        if ($method === "GET") {
            try {
                sendJSON(CalendarsMSGService::getById($input), 200);
            } catch (Exception $e) {
                $msg = $e->getMessage();
                $data = ["error" => $msg];
                if ($msg === "Missing attributes") {
                    sendJSON($data, 400);
                } else if ($msg === "Messages not found") {
                    sendJSON($data, 404);
                }
            }
        } else if ($method === "POST") {
            try {
                sendJSON(CalendarsMSGService::post($input), 200);
            } catch (Exception $e) {
                $msg = $e->getMessage();
                $data = ["error" => $msg];
                if ($msg === "Missing attributes") {
                    sendJSON($data, 400);
                } else if ($msg === "Invalid calendar") {
                    sendJSON($data, 404);
                }
            }
        } else if ($method === "PATCH") {
            try {
                sendJSON(CreateMSGService::patch($input), 200);
            } catch (Exception $e) {
                $msg = $e->getMessage();
                $data = ["error" => $msg];
                if ($msg === "Missing attributes") {
                    sendJSON($data, 400);
                } else if ($msg === "Messages not found") {
                    sendJSON($data, 404);
                }
            }
        } else if ($method === "DELETE") {
            try {
                sendJSON(CalendarsMSGService::delete($input), 200);
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