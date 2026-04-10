<?php

require_once __DIR__ . "/../../services/eventsService.php";



class EventsController {
    public static function handle($method, $input) {
        if ($method === "GET") {
            try {
                $eventId = $input["eventId"] ?? null;
                $calId = $input["calId"] ?? null;

                if ($eventId && !$calId) {
                    self::createResp(EventsService::getEventById($eventId), 200);
                    return;
                } else if ($calId && !$eventId) {
                    self::createResp(EventsService::getEventsCal($calId), 200);
                    return;
                } else if (!$eventId || !$calId) {
                    self::createResp(EventsService::getAllEvents(), 200);
                    return;
                } else {
                    self::createResp(["error" => "Bad request"], 400);
                    return;
                }
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Event not found" || $msg === "No events found") {
                    self::createResp(["error" => "No event(s) found"], 404);
                } else {
                    self::createResp(["error" => $msg], 400);
                }
                return;
            }
        } else if ($method === "POST") {
            try {
                self::createResp(EventsService::createNewEvent($input), 201);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $e->getMessage()], 400);
                    return;
                } else if ($msg === "Cal not found") {
                    self::createResp(["error" => $e->getMessage()], 404);
                    return;
                } else if ($msg === "Unauthorized") {
                    self::createResp(["error" => $e->getMessage()], 403);
                    return;
                }
            }
        } else if ($method === "PATCH") {
            try {
                self::createResp(EventsService::patchEvent($input), 200);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $e->getMessage()], 400);
                    return;
                } else if ($msg === "Unautorized") {
                    self::createResp(["error" => $e->getMessage()], 403);
                    return;
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $e->getMessage()], 404);
                    return;
                }
            }
        } else if ($method === "DELETE") {
            try {
                self::createResp(EventsService::deleteEvent($input), 200);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $e->getMessage()], 400);
                    return;
                } else if ($msg === "Unautorized") {
                    self::createResp(["error" => $e->getMessage()], 403);
                    return;
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $e->getMessage()], 404);
                    return;
                }
            }
        }
    }

    public static function createResp($resp, $code) {
        http_response_code($code);
        echo json_encode($resp);
        return;
    }
}

?>