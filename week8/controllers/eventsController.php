<?php

require_once "../services/EventsService.php";

class EventsController {
    public static function handle($method, $input) {
        if ($method === "GET") {
            try {
                $eventId = $input["eventId"] ?? null;
                $userId = $input["userId"] ?? null;
                $calId = $input["calId"] ?? null;

                if ($eventId) {
                    createResp(EventsService::getEventById($eventId), 200);
                    return;
                } else if ($userId && $calId) {
                    createResp(EventsService::getEventByUserAndCal(["userId" => $userId, "calId" => $calId]), 200);
                    return;
                } else if (!$userId || !$calId) {
                    createResp(EventService::getAllEvents(), 200);
                    return;
                } else {
                    createResp(["error" => "Bad request"], 400);
                    return;
                }
            } catch (Exception $e) {
                createResp(["Error" => $e->getMessage()], 400);
                return;
            }
        } else if ($method === "POST") {
            try {
                createResp(EventsService::createNewEvent($input), 201);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    createResp(["error" => $e->getMessage()], 400);
                    return;
                } else if ($msg === "Event not found") {
                    createResp(["error" => $e->getMessage()], 404);
                    return;
                } else if ($msg === "Unauthorized") {
                    createResp(["error" => $e->getMessage()], 403);
                    return;
                }
            }
        } else if ($method === "PATCH") {
            try {
                createResp(EventsService::patchEvent($input), 200);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    createResp(["error" => $e->getMessage()], 400);
                    return;
                } else if ($msg === "Unautorized") {
                    createResp(["error" => $e->getMessage()], 403);
                    return;
                } else if ($msg === "Not found") {
                    createResp(["error" => $e->getMessage()], 404);
                    return;
                }
            }
        } else if ($method === "DELETE") {
            try {
                createResp(EventsService::deleteEvent($input));
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    createResp(["error" => $e->getMessage()], 400);
                    return;
                } else if ($msg === "Unautorized") {
                    createResp(["error" => $e->getMessage()], 403);
                    return;
                } else if ($msg === "Not found") {
                    createResp(["error" => $e->getMessage()], 404);
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