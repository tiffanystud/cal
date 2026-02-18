<?php

require_once __DIR__ . "/../services/UsersGroupsService.php";

class UsersGroupController {

    public static function handle($method, $input): void {

        /* -------------------- GET -------------------- */
        if ($method === "GET") {
            try {
                $id = $_GET["id"] ?? null;
                $userId = $_GET["userId"] ?? null;
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


        /* -------------------- POST -------------------- */
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


        /* -------------------- PATCH -------------------- */
        if ($method === "PATCH") {
            try {
                // Enda PATCH-operationen: ändra adminstatus
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


        /* -------------------- DELETE -------------------- */
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