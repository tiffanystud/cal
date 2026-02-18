<?php

require_once __DIR__ . "/../services/UsersGroupsService.php";

class UsersGroupController {
   public static function handle($method, $input): void {
        if ($method === "GET") {
            try {
                $id = $_GET["id"] ?? null;
                $userId = $_GET["userId"] ?? null;
                $groupId = $_GET["groupId"] ?? null;

                if($id) {
                    $result = UsersGroupsService->getRelationById($id);
                    http_response_code(200);
                    echo json_encode($result);
                } elseif ($userId){
                    $result = UsersGroupsService->getAllRelationsByUser($userId);
                    http_response_code(200);
                    echo json_encode($result);                    
                } elseif ($groupId){
                    $result = UsersGroupsService->getAllRelationsByGroup($groupId);
                    http_response_code(200);
                    echo json_encode($result);
                    return;
                } else {
                    $result = UsersGroupsService->getAll();
                    http_response_code(200);
                    echo json_encode($result);                    
                }

            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);

            }

        } else if ($method === "POST") {
            try {
                $result = UsersGroupsService::addUserToGroup($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        } else if($method === "PATCH") {
            try {
                $result = UsersGroupsService::makeUserGroupAdmin($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        } else if($method === "DELETE") {
            try {
                $result = UsersGroupsService::removeUserFromGroup($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        }
   }

}