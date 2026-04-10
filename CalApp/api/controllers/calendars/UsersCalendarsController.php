<?php

require_once __DIR__ . "/../../services/UsersCalendarsService.php";

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
                    $result = UsersCalendarsService::getAllRelationsByCalId($calId);
                } else {
                    $result = UsersCalendarsService::getAll();
                }

                self::json($result, 200);
                return;

            } catch (Exception $exc) {
                $code = $exc->getCode() ?:400;
                self::json(["error" => $exc->getMessage()],$code);
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
                $code = $exc->getCode() ?:400;
                self::json(["error" => $exc->getMessage()],$code);
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
                $code = $exc->getCode() ?:400;
                self::json(["error" => $exc->getMessage()],$code);
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
                $code = $exc->getCode() ?:400;
                self::json(["error" => $exc->getMessage()],$code);
                return;
            }
        }
    }

    private static function json($data, $status)
    {
        http_response_code($status);
        header("Content-Type: application/json");
        echo json_encode($data);
        exit;
    }
}
