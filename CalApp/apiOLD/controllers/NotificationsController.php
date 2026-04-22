<?php
require_once "services/NotificationsService.php";
class NotificationsController {
    public static function handle($method, $input) {
        if ($method === "GET") {
            try {
                $userId = $input["userId"] ?? null;
                $notiId = $input["notiId"] ?? null;

                if ($userId && $notiId) {
                    self::createResp(["error" => "Both parameters set, use users_notifications endpoint"], 400);
                    return;
                } else if ($userId) {
                    self::createResp(NotificationsService::getWithParams(null, $userId), 200);
                    return;
                } else if ($notiId) {
                    self::createResp(NotificationsService::getWithParams($notiId, null), 200);
                    return;
                } else {
                    self::createResp(NotificationsService::getAll(), 200);
                }
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Notification not found" || $msg === "User not found") {
                    self::createResp(["error" => "User or Noti not found"], 404);
                    return;
                } else {
                    self::createResp(["error" => $msg], 400);
                }
            }
        } else if ($method === "PATCH") {
            try {
                self::createResp(NotificationsService::patchNoti($input), 200);
                return;
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
        } else if ($method === "DELETE") {
            try {
                self::createResp(NotificationsService::deleteNoti($input), 200);
                return;
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
        } else if ($method === "POST") {
            try {
                self::createResp(NotificationsService::postNoti($input), 201);
                return;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if ($msg === "Missing attributes") {
                    self::createResp(["error" => $msg], 400);
                    return;
                } else if ($msg === "Not found") {
                    self::createResp(["error" => $msg], 404);
                    return;
                } else if ($msg === "Not acceptable, both event and msg set") {
                    self::createResp(["error" => $msg], 406);
                    return;
                } //else if ($msg === "Conflict") {
                //     self::createResp(["error" => $msg], 409);
                //     return;
                // } 
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