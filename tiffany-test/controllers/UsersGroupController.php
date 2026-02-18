<?php

require_once __DIR__ . "/../services/UsersGroupService.php";

class UsersGroupController {
   public static function handle($method, $input): void {
        if ($method === "GET") {
            try {
                $id = $_GET["id"] ?? null;
                $userId = $_GET["userId"] ?? null;
                $groupId = $_GET["groupId"] ?? null;

                if($id) {
                    $result = UsersGroupService::getRelationById($id);
                    http_response_code(200);
                    echo json_encode($result);
                } elseif ($userId){
                    $result = UsersGroupService::getAllRelationsByUser($userId);
                    http_response_code(200);
                    echo json_encode($result);                    
                } elseif ($groupId){
                    $result = UsersGroupService::getAllRelationsByGroup($groupId);
                    http_response_code(200);
                    echo json_encode($result);
                    return;
                } else {
                    $result = UsersGroupService::getAll();
                    http_response_code(200);
                    echo json_encode($result);                    
                }

            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);

            }

        } else if ($method === "POST") {
            try {
                $result = UsersGroupService::addUserToGroup($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        } else if($method === "PATCH") {
            try {
                $result = UsersGroupService::makeUserGroupAdmin($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        } else if($method === "DELETE") {
            try {
                $result = UsersGroupService::removeUserFromGroup($input);
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