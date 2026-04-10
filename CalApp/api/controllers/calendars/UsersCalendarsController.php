<?php

require_once __DIR__ . "/../../services/UsersCalendarsService.php";
require_once __DIR__ . "/../sendJSON.php";

class UsersCalendarsController {

    public static function handle($method, $input) {
        try {
            if ($method === "GET") {
                if (empty($input)) {
                    $data = UsersCalendarsService::getAll();
                    sendJSON($data, 200);
                    return;
                } else if (isset($input["userId"])) {
                    $data = UsersCalendarsService::getByParam($input);
                    sendJSON($data, 200);
                    return;
                } else if (isset($input["calId"])) {
                    $data = UsersCalendarsService::getByParam($input);
                    sendJSON($data, 200);
                    return;
                } else {
                    throw new Exception("Missing attributes");
                }
            }
    
            if ($method === "POST") {
                if (!isset($input["userId"]) || !isset($input["calId"]) || !isset($input["isAdmin"])) {
                    throw new Exception("Missing attributes");
                }
                $data = UsersCalendarsService::post($input);
                sendJSON($data, 201);
                return;
            }
    
            if ($method === "PATCH") {
                if (!isset($input["id"]) || !isset($input["userId"]) || !isset($input["calId"]) || !isset($input["isAdmin"])) {
                    throw new Exception("User ID / CAL ID missing");
                }
                $data = UsersCalendarsService::patch($input);
                sendJSON($data, 200);
                return;
            }
    
            if ($method === "DELETE") {
                if (!isset($input["userId"]) || !isset($input["calId"])) {
                    throw new Exception("User ID / Cal ID missing");
                }
                $data = UsersCalendarsService::delete($input);
                sendJSON($data, 200);
                return;
            }

            // Hantera okända metoder
            throw new Exception("Method not allowed");

        } catch (Exception $error) {
            self::errorHandler($error);
        }
    }

    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        // Generella fel
        if ($message === "Missing attributes") {
            sendJSON(["error" => "Missing attributes"], 400);
        }

        // GET
        if ($message === "No calendars found") {
            sendJSON(["error" => "No calendars found"], 404);
        }
        if ($message === "Calendar not found") {
            sendJSON(["error" => "Calendar not found"], 404);
        }
        if ($message === "User not found") {
            sendJSON(["error" => "User not found"], 404);
        }

        // POST
        if ($message === "User or cal not found") {
            sendJSON(["error" => "User or cal not found"], 404);
        }
        if ($message === "User is already in cal") {
            sendJSON(["error" => "User is already in cal"], 409);
        }

        // PATCH
        if ($message === "User ID / CAL ID missing") {
            sendJSON(["error" => "User ID / CAL ID missing"], 400);
        }
        if ($message === "User not in calendar") {
            sendJSON(["error" => "User not in calendar"], 400);
        }

        // DELETE
        if ($message === "User not found / Cal not found") {
            sendJSON(["error" => "User not found / Cal not found"], 404);
        }
        if ($message === "Relation not found") {
            sendJSON(["error" => "Relation not found"], 404);
        }

        sendJSON(["error" => "Internal server error"], 500);
    }
}