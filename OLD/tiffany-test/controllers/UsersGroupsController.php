<?php

require_once __DIR__ . "/../services/UsersGroupsService.php";

class UsersGroupController {

    public static function handle($method, $input): void {

        if ($method === "GET") {
            try {
                $id      = $_GET["id"] ?? null;
                $userId  = $_GET["userId"] ?? null;
                $groupId = $_GET["groupId"] ?? null;

                if ($id) {
                    $result = UsersGroupsService::getRelationById($id);
                } elseif ($userId) {
                    $result = UsersGroupsService::getAllRelationsByUser($userId);
                } elseif ($groupId) {
                    $result = UsersGroupsService::getAllRelationsByGroup($groupId);
                } else {
                    $result = UsersGroupsService::getAll();
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
                $result = UsersGroupsService::addUserToGroup($input);
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
                $result = UsersGroupsService::makeUserGroupAdmin($input);
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
                $result = UsersGroupsService::removeUserFromGroup($input);
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
