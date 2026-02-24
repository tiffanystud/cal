<?php

require_once "services/EventAdminsService.php";

class EventAdminsController {
    public static function handle($method, $input) {
        if ($method === "GET") {
            try {
                $userId = $input["userId"] ?? null;
                $eventId = $input["eventId"] ?? null;

                if ($userId && $eventId) {
                    self::createResp(EventAdminsService::getById(["eventId" => $eventId, "userId" => $userId]), 200);
                    return;
                } else if ($userId) {
                    self::createResp(EventAdminsService::getById(["userId" => $userId]), 200);
                    return;
                } else if ($eventId) {
                    self::createResp(EventAdminsService::getById(["eventId" => $eventId]), 200);
                    return;
                } else {
                    self::createResp(EventAdminsService::getAll(), 200);
                    return;
                }
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Not found") {
                    self::createResp(["error" => "Not found"], 404);
                } else {
                    self::createResp(["error" => "Bad request"], 400);
                }
            }
        } else if ($method === "POST") {
            try {
                self::createResp(EventAdminsService::newEventAdmin($input), 200);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $msg], 400);
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $msg], 404);
                } else if ($msg === "Unauthorized") {
                    self::createResp(["error" => $msg], 403);
                }
            }
        } else if ($method === "PATCH") {
            try {
                self::createResp(EventAdminsService::patchEventAdmin($input), 200);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $msg], 400);
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $msg], 404);
                } else if ($msg === "Unauthorized") {
                    self::createResp(["error" => $msg], 403);
                }
            }
        } else if ($method === "DELETE") {
            try {
                self::createResp(EventAdminsService::deleteEventAdmin($input), 200);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $msg], 400);
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $msg], 404);
                } else if ($msg === "Unauthorized") {
                    self::createResp(["error" => $msg], 403);
                }
            }
        } else {
            self::createResp(["error" => "Bad request"], 400);
        }
    }

    public static function createResp($resp, $code) {
        http_response_code($code);
        echo json_encode($resp);
        return;
    }
}

?>