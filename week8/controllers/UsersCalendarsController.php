<?php

require_once __DIR__ . "/../services/UsersCalendarsService.php";

class UsersCalendarsController {

    public static function handle($method, $input): void {

        if ($method === "GET") {
            try {
                $id      = $_GET["id"] ?? null;
                $userId  = $_GET["userId"] ?? null;
                $calId = $_GET["calId"] ?? null;

                if ($id) {
                    $result = UsersCalendarsService::getRelationById($id);
                } elseif ($userId) {
                    $result = UsersCalendarsService::getAllRelationsByUser($userId);
                } elseif ($calId) {
                    $result = UsersCalendarsService::getAllRelationsByCalendar($calId);
                } else {
                    $result = UsersCalendarsService::getAll();
                }

                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }
        }


        if ($method === "POST") {
            try {
                $result = UsersCalendarsService::addUserToCalendar($input);
                http_response_code(201);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }
        }

        if ($method === "PATCH") {
            try {
                $result = UsersCalendarsService::makeUserCalAdmin($input);
                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }
        }

        if ($method === "DELETE") {
            try {
                $result = UsersCalendarsService::removeUserFromCal($input);
                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }
        }
    }
}
