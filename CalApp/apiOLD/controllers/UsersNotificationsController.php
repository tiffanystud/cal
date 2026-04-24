<?php
require_once "services/UsersNotificationsService.php";

class UsersNotificationsController {
    public static function handle($method, $input) {
        if ($method === "GET") {
            $userId = $input["userId"] ?? null;
            $notiId = $input["notiId"] ?? null;

            if (!$userId && !$notiId) {
                self::createResp(UsersNotificationsService::getAll(), 200);
                return;
            } else {
                self::createResp(UsersNotificationsService::getByParams($userId, $notiId), 200);
                return;
            }
        } else if ($method === "POST") {
            try {
                self::createResp(UsersNotificationsService::postUserNoti($input), 201);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $msg], 400);
                    return;
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $msg], 404);
                    return;
                } else if ($msg === "Conflict") {
                    self::createResp(["error" => $msg], 409);
                    return;
                }
            }
        } else if ($method === "DELETE") {
            try {
                self::createResp(UsersNotificationsService::deleteUserNoti($input), 200);
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $msg], 400);
                    return;
                } else if ($msg === "Unauthorized") {
                    self::createResp(["error" => $msg], 403);
                    return;
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $msg], 404);
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